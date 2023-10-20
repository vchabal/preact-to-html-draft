const {
  join,
  relative
} = require('path');

const {
  execSync
} = require('child_process');

const {
  readFileSync
} = require('fs');

const {
  sys,
  resolveModuleName,
  parseConfigFileTextToJson,
  parseJsonConfigFileContent
} = require('typescript');

const STDIO = [process.stdin, process.stdout, process.stderr];
const TSX = /\.tsx?$/i;

function getTsConfig() {
  const tsconfigJsonPath = join(process.cwd(), './tsconfig.json')
  const tsconfigJson = readFileSync(tsconfigJsonPath, { encoding: 'utf8' });
  const { config } = parseConfigFileTextToJson(tsconfigJsonPath, tsconfigJson);
  return parseJsonConfigFileContent(config, sys, process.cwd(), void 0, tsconfigJsonPath);
}

module.exports = (replace) => {
  const { options } = getTsConfig();

  return {
    name: 'tsc',

    buildStart() {
      execSync('tsc --build', { cwd: process.cwd(), stdio: STDIO });
    },

    resolveId(id, importer) {
      if (replace && id in replace) {
        //console.log('replacing >>', id, replace[id]);
        return replace[id];
      }
      if (!id || !importer) return null;
      const { resolvedModule } = resolveModuleName(id, importer, options, sys);
      if (!resolvedModule || resolvedModule.extension === '.d.ts') return null;
      return resolvedModule.resolvedFileName;
    },

    load(id) {
      if (!TSX.test(id)) return null;
      const outDir = options.outDir;
      const tsFile = relative(process.cwd(), id);
      const jsFile = join(outDir, tsFile).replace(TSX, '.js');
      return readFileSync(jsFile, { encoding: 'utf8' });
    }
  };
}
