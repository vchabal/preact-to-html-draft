module.exports = () => {
  return {
    name: 'html',

    renderChunk(code, _, options) {
      const scope = 'var window = {' +
        'addEventListener: ()=>{}' +
      '};';

      // Prepare HTML
      const codeFn = new Function(scope + code + `return ${options.name};`);
      const result = codeFn();

      // Read Html template, apply HTML JS CSS
      return '<!DOCTYPE html>' + result;
    }
  }
}
