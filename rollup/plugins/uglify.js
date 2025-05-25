const { minify } = require('uglify-js');

module.exports = () => {
  return {
    name: 'uglify',

    renderChunk(code) {
      // console.info('[inf] [uglify] RND:', code.length);
      const result = minify(code);

      if (result.error)
        throw error;

      return result.code;
    }
  }
}
