const {
  readFileSync,
  writeFileSync,
  createWriteStream
} = require('fs');
const {
  join
} = require('path');
const {
  get
} = require('https');

const cwd = process.cwd().replace(/\\/g, '/');
const data = { in: null, out: null };
for (let i = 0; i < process.argv.length; i++) {
  if (!process.argv[i].startsWith('--'))
    continue;

  const argName = process.argv[i].substring(2).trim();
  const argValue = process.argv[++i].trim();
  data[argName] = argValue;
}

console.log('Input: ', cwd, data);

const IS_URL_LINE = /(.+url)\((http.+?)\)(.+;\s*)/
const css = readFileSync(join(cwd, data.in), { encoding: 'utf8' }).split(/\n+/);
for (let i = 0; i < css.length; i++) {
  const line = css[i];
  if (!IS_URL_LINE.test(line))
    continue;

  const url = line.replace(IS_URL_LINE, '$2');
  const fileName = url.replace(/.+\/(.+\..+)/, '$1');
  css[i] = line.replace(IS_URL_LINE, '$1(' + fileName + ')$3');
  console.log(css[i]);
  get(url, res => {
    const stream = createWriteStream(join(cwd, data.in, '..', fileName));
    res.pipe(stream);
    stream.on('finish', () => stream.close())
  });
}

writeFileSync(join(cwd, data.in, '..', data.out), css.join('\n'), { encoding: 'utf8' });
