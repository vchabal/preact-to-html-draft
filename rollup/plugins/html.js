module.exports = () => {
  return {
    name: 'html',

    renderChunk(code, _, options) {
      const scope = '' +
      'var console = { log: ()=>{}, error: (e)=>{throw new Error(e)} };' +
      'var window = {' +
        'prerender: true,' +
        'requestAnimationFrame: ()=>{},' +
        'addEventListener: ()=>{},' +
        'setTimeout: ()=>{},' +
        'setInterval: ()=>{},' +
        'console: console,' +
        'document: { body: { clientWidth: 960 } },' +
        'localStorage: { getItem: ()=>null },' +
      '};';

      // Prepare HTML
      const codeFn = new Function(scope + code + `return ${options.name};`);
      const result = codeFn();

      // Read Html template, apply HTML JS CSS
      return '<!DOCTYPE html>' + result;
    }
  }
}
