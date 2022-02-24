import ErrnoException = NodeJS.ErrnoException;
const toml = require('toml'); //TODO: Use import instead of require
const fs = require('fs'); //TODO: Use import instead of require

// export const convertTomlToJson = (path: string, fileName: string, callback: (data: any) => void ) => {
//   fs.readFile(path, 'utf8', (err: ErrnoException | null, data: string) => {
//     if (err) return;
//     const data2 = toml.parse(data);
//     callback(JSON.parse(JSON.stringify(data2)))
//   })
// };

export const convertTomlToJson = async (
  path: string,
  fileName: string,
  callback?: (data: any) => void
) => {
  // fs.readFile(path, 'utf8', (err: ErrnoException | null, data: string) => {
  //   if (err) return;
  //   const data2 = toml.parse(data);
  //   callback(JSON.parse(JSON.stringify(data2)))
  // })
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err: ErrnoException | null, data: string) => {
      if (err) return;
      resolve(JSON.parse(JSON.stringify(toml.parse(data))));
    });
  });
};

// export const readJSONFile = (path: string, fileName: string) => {
//   fs.readFile(path, 'utf8', (err: ErrnoException | null, data: string) => {
//     if (err) {
//       return;
//     }
//     const data2 = {
//       [fileName]: JSON.parse(data)
//     };
//     console.log(data2);
//   });
// };
