const { relative } = require('path');

module.exports = (watchTarget) => {
  return {
    name: 'watchTarget',
    buildStart() {
      if (!watchTarget) {
        return;
      }

      const addToWatch =  relative(process.cwd(), watchTarget);
      // console.info('[INF] Adding to watch:', addToWatch);
      this.addWatchFile(addToWatch);
    }
  }
}
