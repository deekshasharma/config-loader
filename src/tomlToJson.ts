import ErrnoException = NodeJS.ErrnoException;
const toml = require('toml');
const fs = require('fs');

export const convertTomlToJson = async (path: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: ErrnoException | null, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      resolve({ [fileName]: JSON.parse(JSON.stringify(toml.parse(data))) });
    });
  });
};

export const convertJsonToObject = async (path: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: ErrnoException | null, data: string) => {
      if (err) reject(`Error handling file, ${err}`);
      resolve({ [fileName]: JSON.parse(data) });
    });
  });
};
