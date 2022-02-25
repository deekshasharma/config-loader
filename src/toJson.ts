import ErrnoException = NodeJS.ErrnoException;
const toml = require('toml');
const fs = require('fs');
import yaml from 'js-yaml';
import path from 'path';

export const convertToJson = async (filePath: string) => {
  const fileExtension = path.extname(filePath);
  const fileName = path.basename(filePath, fileExtension);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err: ErrnoException | null, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      if (fileExtension === '.toml')
        resolve({ [fileName]: JSON.parse(JSON.stringify(toml.parse(data))) });
      else if (fileExtension === '.json')
        resolve({ [fileName]: JSON.parse(data) });
      else {
        resolve({
          [fileName]: yaml.load(
            fs.readFileSync(filePath, { encoding: 'utf-8' })
          )
        });
      }
    });
  });
};
