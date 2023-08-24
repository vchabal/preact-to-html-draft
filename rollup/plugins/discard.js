module.exports = (regex) => {
  return {
    name: 'discard',

    load(id) {
      if (regex.test(id))
        return 'export default null;';
      return null;
    }
  };
}
