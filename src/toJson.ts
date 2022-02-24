import ErrnoException = NodeJS.ErrnoException;
const toml = require('toml');
const fs = require('fs');

export const convertToJson = async (
  path: string,
  fileName: string,
  fileExtension: string
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: ErrnoException | null, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      if (fileExtension === '.toml')
        resolve({ [fileName]: JSON.parse(JSON.stringify(toml.parse(data))) });
      else if (fileExtension === '.json')
        resolve({ [fileName]: JSON.parse(data) });
    });
  });
};
