module.exports = () => {
  return {
    name: 'html',

    renderChunk(code, _, options) {
      console.info('[inf] [html] HTML', options.name);

      // Prepare HTML
      const codeFn = new Function(code + `return ${options.name};`);
      const result = codeFn();

      // Read Html template, apply HTML JS CSS
      return '<!DOCTYPE html>' + result;
    }
  }
}
