const {
  statSync,
  mkdirSync,
  existsSync,
  readdirSync,
  copyFileSync
} = require('fs');

const {
  join
} = require('path');

function errHandler(err) {
  if (err && err.code !== 'EEXIST')
    throw err;
}

function copyRecursiveSync(src, dest) {
  const isDir = existsSync(src) && statSync(src).isDirectory();

  if (isDir) {
    mkdirSync(dest, { recursive: true,  }, errHandler);
    readdirSync(src)
      .forEach(child => {
        copyRecursiveSync(
          join(src, child),
          join(dest, child)
        );
    });
  } else {
    mkdirSync(join(dest, '..'), { recursive: true,  }, errHandler);
    copyFileSync(src, dest);
  }
};

module.exports = (list) => {
  return {
    name: 'copy',
    buildEnd(err) {
      if (err)
        return;

      for (const item of list) {
        copyRecursiveSync(item.from, item.to);
        console.info('[inf] [copy] Copied from', item.from, 'to', item.to);
      }
    }
  }
}
