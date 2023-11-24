const { compileString } = require('sass');
var postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const {
  join,
  relative
} = require('path');

const {
  readFileSync
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

function getTsConfig() {
  const tsconfigJsonPath = join(process.cwd(), './tsconfig.json')
  const tsconfigJson = readFileSync(tsconfigJsonPath, { encoding: 'utf8' });
  const { config } = parseConfigFileTextToJson(tsconfigJsonPath, tsconfigJson);
  return parseJsonConfigFileContent(config, sys, process.cwd(), void 0, tsconfigJsonPath);
}

module.exports = (watch) => {
  const { options } = getTsConfig();
  const data = { styles: null, order: null, output: null };

  return {
    name: 'css',

    buildStart(opts) {
      data.styles = {};
      data.order = [];
      data.output = null;
    },

    /**
     * Example: @modules/demo /home/project/src/page/en/index.tsx
     *
     * @param {string} id File to import
     * @param {string} importer
     * @returns Resolved import file path, /home/project/src/modules/demo.tsx
     */
    resolveId(id, importer) {
      if (!id || !importer) return null;
      if (TSX.test(importer)) {
        const { resolvedModule } = resolveModuleName(id, importer, options, sys);
        if (!resolvedModule || resolvedModule.extension === '.d.ts') return null;
        return resolvedModule.resolvedFileName;
      }
      if (SCSS.test(importer)) {
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
      // Resolve typescript file and return just imports
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

        return jsContents.join('\n');
      }

      // Resolve scss file
      if (SCSS.test(id)) {
        return readFileSync(id, { encoding: 'utf8' })
          .split(/\n+/)
          .filter(line => SCSS_USE.test(line))
          .map(line => line.replace(SCSS_USE_PATH, '$1'))
          .map(line => line.startsWith('~') ? line.substring(1) : line)
          .filter(path => !SCSS_USE_LIB.test(path))
          .map(path => `import '${path}.scss';`)
          .join('\n');
      }

      return null;
    },

    buildEnd() {
      const stylesArray = [];
      for (const id of data.order) {
        // On Windows it's required to replace backslash
        const scssFile = relative(process.cwd(), id).replace(/\\/g, '/');
        stylesArray.push(`@use '${scssFile}';`);
      }

      const cwd = process.cwd().replace(/\\/g, '/');
      const cssResult = compileString(stylesArray.join('\n'), {
        verbose: watch,
        style: 'compressed',
        loadPaths: [ cwd ],
        sourceMapIncludeSources: watch,
        sourceMap: watch,
        importers: [{
          findFileUrl: (path) => {
            path = path.startsWith('~src/') ? path.substring(1) :
                   path.startsWith('src/') ? path :
                   null;

            if (!path) {
              console.info('[inf] [scss] no url for', path);
              return null;
            }

            //console.info('[inf] [scss] URL:', cwd, path);
            const url = new URL('file://' + cwd + '/' + path + '.scss');
            return url;
          }
        }]
      });

      data.output = cssResult;
    },

    renderChunk() {
      const compileResulst = data.output;
      let smComment = '';

      if (compileResulst.sourceMap) {
        // https://github.com/sass/dart-sass/issues/1594#issuecomment-1013208452
        const sm = JSON.stringify(compileResulst.sourceMap);
        const smBase64 = (Buffer.from(sm, 'utf8') || '').toString('base64');
        smComment = '\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smBase64 + ' */';
        return compileResulst.css + smComment;
      }

      return postcss([ autoprefixer({ remove: false, add: true }) ])
        .process(compileResulst.css)
        .css;
    }
  };
}
