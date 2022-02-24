import { convertTomlToJson, readJSONFile } from './tomlToJson';

const path =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';
const fileName = 'collect';
const jsonFilePath =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/sample.json';

convertTomlToJson(path, fileName);
readJSONFile(jsonFilePath, 'sample');
