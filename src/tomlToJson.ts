// const toml = require('toml');
// const fs = require('fs');
// const path = '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';
//
// function convertTomlToJson() {
//     fs.readFile(
//         path,
//         'utf8',
//         (err, data) => {
//             if (err) {
//                 // console.error(err)
//                 return;
//             }
//             const data2 = toml.parse(data);
//             const json = {
//                 collect: JSON.parse(JSON.stringify(data2))
//             };
//             console.log(json);
//         }
//     );
// }
//
// module.exports = { convertTomlToJson }
