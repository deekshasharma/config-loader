const toml = require('toml');
const fs = require('fs');
import yaml from 'js-yaml';
import path from 'path';

export const convertToJson = async (filePath: string) => {
  const fileExtension = path.extname(filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err: any, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      if (fileExtension === '.toml')
        resolve(JSON.parse(JSON.stringify(toml.parse(data))));
      else if (fileExtension === '.json') resolve(JSON.parse(data));
      else {
        resolve(yaml.load(fs.readFileSync(filePath, { encoding: 'utf-8' })));
      }
    });
  });
};
