// const fs = require('fs');
// const toml = require('toml');
// const path =
//   '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';
//
// fs.readFile(path, 'utf8', (err, data) => {
//   if (err) {
//     // console.error(err)
//     return;
//   }
//   const data2 = toml.parse(data);
//   const json = {
//     collect: JSON.parse(JSON.stringify(data2))
//   };
//   // console.log(json);
// });

import { convertTomlToJson } from './tomlToJson';
convertTomlToJson();
