import { convertToJson } from './toJson';
import path from 'path';
import { findConfigFiles } from './configLoader';

export const getConfig = (searchPath = './') => {
  return findConfigFiles(searchPath).then((allFiles) => {
    const tomlFiles = allFiles.toml;
    const jsonFiles = allFiles.json;
    const yamlFiles = allFiles.yaml;
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

    const allYamlPromises = yamlFiles.map((currentFile) => {
      const fileExtension = path.extname(currentFile);
      const fileName = path.basename(currentFile, fileExtension);
      return convertToJson(currentFile, fileName, fileExtension);
    });

    return Promise.all([
      ...allTomlPromises,
      ...allJsonPromises,
      ...allYamlPromises
    ]).then((values) => {
      return values.reduce((acc: any, value) => {
        return Object.assign({ ...acc }, value);
      }, {});
    });
  });
};

// eslint-disable-next-line no-console
getConfig('./src').then((config) => console.log(JSON.stringify(config)));
