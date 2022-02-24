import { convertToJson } from './toJson';
import path from 'path';
import { findConfigFiles } from './configLoader';

findConfigFiles('./src').then((allFiles) => {
  const tomlFiles = allFiles.toml;
  const jsonFiles = allFiles.json;
  const allTomlPromises = tomlFiles.map(async (currentFile) => {
    const fileExtension = path.extname(currentFile);
    const fileName = path.basename(currentFile, fileExtension);
    return await convertToJson(currentFile, fileName, fileExtension);
  });

  const allJsonPromises = jsonFiles.map(async (currentFile) => {
    const fileExtension = path.extname(currentFile);
    const fileName = path.basename(currentFile, fileExtension);
    return await convertToJson(currentFile, fileName, fileExtension);
  });

  const mergedConfigPromise = Promise.all([
    ...allTomlPromises,
    ...allJsonPromises
  ]).then((values) => {
    return values.reduce((acc: any, value) => {
      return Object.assign({ ...acc }, value);
    }, {});
  });
  mergedConfigPromise.then((config) => console.log(JSON.stringify(config)));
});
