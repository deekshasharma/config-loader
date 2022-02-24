import { convertTomlToJson, readJSONFile } from './tomlToJson';
const path =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';

const jsonFilePath =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/sample.json';
// convertTomlToJson(path);
readJSONFile(jsonFilePath);
