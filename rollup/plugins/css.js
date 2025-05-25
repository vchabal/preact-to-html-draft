const { compileString } = require('sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const {
  join,
  relative
} = require('path');

const {
  readFileSync,
  existsSync
} = require('fs');

const {
  sys,
  resolveModuleName,
  parseConfigFileTextToJson,
  parseJsonConfigFileContent,
} = require('typescript');

const SCSS = /\.scss$/i;
const TSX = /\.tsx?$/i;

const SCSS_IMPORT = /^\s*import.+\.scss';?$/
const SCSS_IMPORT_PATH = /.*import\s['"`](.+)['"`].*/;

const SCSS_USE = /^\s*@use/;
const SCSS_USE_LIB = /sass:.+/;
const SCSS_USE_PATH = /^\s*@use\s+['"](.+)['"].*;/;

const SCSS_RENDER_IMPORT = /____rollupCssImport\('.+'\)/;
const SCSS_RENDER_PATH = /.*____rollupCssImport\('(.+)'\).*/;

function getTsConfig() {
  const tsconfigJsonPath = join(process.cwd(), './tsconfig.json')
  const tsconfigJson = readFileSync(tsconfigJsonPath, { encoding: 'utf8' });
  const { config } = parseConfigFileTextToJson(tsconfigJsonPath, tsconfigJson);
  return parseJsonConfigFileContent(config, sys, process.cwd(), void 0, tsconfigJsonPath);
}

function renderScssImport(line, id) {
  if (!SCSS_IMPORT.test(line))
    return line;

  const scssPath = line.replace(SCSS_IMPORT_PATH, '$1');
  const scssImport = join(id, '..', scssPath);
  return `____rollupCssImport('${scssImport}');\n${line}`;
}

module.exports = (watch) => {
  const { options } = getTsConfig();
  const data = { styles: null, order: null };

  return {
    name: 'css',

    buildStart(opts) {
      data.styles = {};
      data.order = [];
    },

    /**
     * Example: @modules/demo /home/project/src/page/en/index.tsx
     *
     * @param {string} id File to import
     * @param {string} importer
     * @returns Resolved import file path, /home/project/src/modules/demo.tsx
     */
    resolveId(id, importer) {
      if (!id || !importer)
        return null;
      if (TSX.test(importer)) {
        const { resolvedModule } = resolveModuleName(id, importer, options, sys);
        if (!resolvedModule || resolvedModule.extension === '.d.ts') return null;
        // console.info('[inf] [css] RSL tsx:', id, importer);
        return resolvedModule.resolvedFileName;
      }

      if (SCSS.test(importer)) {
        // console.info('[inf] [css] RSL css:', id, importer);
        return id.startsWith('src/') ?
          join(process.cwd(), id).replace(/\\/g, '/'):
          join(importer, '..', id).replace(/\\/g, '/');
      }
    },

    /**
     * Example: src/modules/demo.tsx
     *
     * @param {string} id Relative file path to load
     * @returns File contents
     */
    load(id) {
      // Resolve typescript file
      if (TSX.test(id)) {
        const outDir = options.outDir;
        const tsFile = relative(process.cwd(), id);
        const jsFile = join(outDir, tsFile).replace(TSX, '.js');
        const jsContents = readFileSync(jsFile, { encoding: 'utf8' }).split(/\n+/);

        const scssImports = jsContents
          .filter(line => SCSS_IMPORT.test(line))
          .map(line => line.replace(SCSS_IMPORT_PATH, '$1'))
          .map(path => join(id, '..', path).replace(/\\/g, '/'));

        for(const scssImport of scssImports) {
          if (data.styles[scssImport]) continue;
          data.styles[scssImport] = true;
          data.order.push(scssImport);
        }

        return jsContents
          .map(line => renderScssImport(line, id))
          .join('\n');
      }

      // Resolve scss file
      if (SCSS.test(id)) {
        return readFileSync(id, { encoding: 'utf8' })
          .split(/\n+/)
          .filter(line => SCSS_USE.test(line))
          .map(line => line.replace(SCSS_USE_PATH, '$1'))
          .map(line => line.startsWith('~') ? line.substring(1) : line)
          .filter(path => !SCSS_USE_LIB.test(path))
          .map(path => `import '${path}.scss';\n____rollupCssFile('${id}')`)
          .join('\n');
      }

      return null;
    },

    renderChunk(code) {
      const scssFileWithImports = code.split(/\n/)
        .filter(line => SCSS_RENDER_IMPORT.test(line))
        .map(line => line.replace(SCSS_RENDER_PATH, '$1'))
        .filter((line, index, array) => array.indexOf(line) === index)
        .sort((a, b) => data.order.indexOf(a) - data.order.indexOf(b))
        .map(scssFilePath => `@use '${scssFilePath.replace(/\\/g, '/')}';`);

      //console.info('[inf] [css] scss files', scssFileWithImports);

      const cwd = process.cwd();
      const compileResult = compileString(scssFileWithImports.join('\n'), {
        verbose: watch,
        style: 'compressed',
        loadPaths: [ cwd ],
        sourceMapIncludeSources: watch,
        sourceMap: watch,
        importers: [{
          findFileUrl: (path) => {
            path = SCSS.test(path) ? path
                 : path + '.scss';
            path = path.startsWith('~src/') ? join(cwd, path.substring(1))
                 : path.startsWith('src/') ? join(cwd , path)
                 : existsSync(path) ? path
                 : null;

            if (!path) {
              console.info('[inf] [css] no url for', path);
              return null;
            }

            //console.info('[inf] [css] URL:', cwd, path);
            return new URL('file://' + path);
          }
        }]
      });

      let smComment = '';
      if (compileResult.sourceMap) {
        // https://github.com/sass/dart-sass/issues/1594#issuecomment-1013208452
        const sm = JSON.stringify(compileResult.sourceMap);
        const smBase64 = (Buffer.from(sm, 'utf8') || '').toString('base64');
        smComment = '\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smBase64 + ' */';
        return compileResult.css + smComment;
      }

      return postcss([ autoprefixer({ remove: false, add: true }) ])
        .process(compileResult.css)
        .css;
    }
  };
}
