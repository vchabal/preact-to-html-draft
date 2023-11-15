const { minify } = require('uglify-js');

module.exports = () => {
  return {
    name: 'uglify',

    renderChunk(code) {
      const result = minify(code);

      if (result.error)
        throw error;

      return result.code;
    }
  }
}
