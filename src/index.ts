import { convertTomlToJson } from './tomlToJson';
import path from 'path';
import { findConfigFiles } from './configLoader';

/**
 * Read JSON file
 */
// const jsonFilePath =
//   '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/sample.json';
// const extensionJson = path.extname(jsonFilePath);
// const jsonFileName = path.basename(jsonFilePath, extensionJson);
// readJSONFile(jsonFilePath, jsonFileName);

findConfigFiles('./src').then((allFiles) => {
  const tomlFiles = allFiles.toml;
  const allConfigPromises = tomlFiles.map(async (currentFile) => {
    const fileExtension = path.extname(currentFile);
    const fileName = path.basename(currentFile, fileExtension);
    return await convertTomlToJson(currentFile, fileName);
  });
  const mergedConfigPromise = Promise.all(allConfigPromises).then((values) => {
    return values.reduce((acc: any, value) => {
      return Object.assign({ ...acc }, value);
    }, {});
  });
  mergedConfigPromise.then((config) => console.log(config));
});
