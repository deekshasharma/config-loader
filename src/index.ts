import { convertToJson } from './toJson';
import { findConfigFiles } from './configLoader';
import path, { sep } from 'path';

const getNestedPath = (pathToFile: string) => {
  const removeRelativePaths = (paths: string[]) =>
    paths.filter((p) => {
      const trimmedPath = p.trim();
      return (
        trimmedPath.length > 0 && trimmedPath !== '.' && trimmedPath !== '..'
      );
    });
  const pathSplits = pathToFile.split(sep);
  const fileExtension = path.extname(pathToFile);
  const fileName = path.basename(pathToFile, fileExtension);
  return [
    ...removeRelativePaths(pathSplits.slice(0, pathSplits.length - 1)),
    fileName
  ];
};

function setNestedData(root: any, path: string, value: any) {
  const paths = path.split('.');
  const last_index = paths.length - 1;
  paths.forEach(function (key, index) {
    if (!(key in root)) root[key] = {};
    if (index == last_index) root[key] = value;
    root = root[key];
  });
  return root;
}

const result = {};
export const getConfig = (searchPath = './') => {
  return findConfigFiles(searchPath).then((allFiles) => {
    const configFiles = [...allFiles.toml, ...allFiles.json, ...allFiles.yaml];
    const allPromises = configFiles.map(async (currentFilePath) => {
      return {
        path: currentFilePath,
        value: await convertToJson(currentFilePath)
      };
    });
    return Promise.all([...allPromises]).then((values) => {
      return values.reduce((acc: any, value) => {
        const joinedPath = getNestedPath(value.path).join('.');
        const appendValue = value.value;
        setNestedData(result, joinedPath, appendValue);
        return Object.assign({ ...acc }, value);
      }, {});
    });
  });
};

/**
 * Uncomment to see the example usage of the getConfig() function
 */
// eslint-disable-next-line no-console
getConfig('./src').then((config) => console.log(JSON.stringify(result)));
