import ErrnoException = NodeJS.ErrnoException;

const toml = require('toml');
const fs = require('fs');

export const convertTomlToJson = (path: string) => {
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

export const readJSONFile = (path: string) => {
  fs.readFile(path, 'utf8', (err: ErrnoException | null, data: string) => {
    if (err) {
      // console.error(err)
      return;
    }
    const data2 = JSON.parse(data);
    // const json = {
    //   fileName: JSON.parse(JSON.stringify(data2))
    // };
    console.log(data2);
  });
};
