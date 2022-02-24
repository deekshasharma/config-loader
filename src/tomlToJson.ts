import ErrnoException = NodeJS.ErrnoException;

const toml = require('toml');
const fs = require('fs');
const path =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';

export const convertTomlToJson = () => {
  fs.readFile(path, 'utf8', (err: ErrnoException | null, data: string) => {
    if (err) {
      // console.error(err)
      return;
    }
    const data2 = toml.parse(data);
    const json = {
      collect: JSON.parse(JSON.stringify(data2))
    };
    console.log(json);
  });
};
