import { convertTomlToJson } from './tomlToJson';
import path from 'path';
import { findConfigFiles } from './configLoader';

/**
 * Read TOML file
 */
// const tomlFilePath =
//   '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';
// const extensionToml = path.extname(tomlFilePath);
// const tomlFileName = path.basename(tomlFilePath, extensionToml);
// convertTomlToJson(tomlFilePath, tomlFileName);

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
  // console.log(`TOML Files ->`, tomlFiles);
  const resultingConfig = tomlFiles.reduce(
    async (acc: any = {}, currentFile) => {
      const fileExtension = path.extname(currentFile);
      const fileName = path.basename(currentFile, fileExtension);
      // return convertTomlToJson(currentFile, fileName, (config) => {
      //   acc[fileName] = config;
      //   return acc;
      // })
      const config = await convertTomlToJson(currentFile, fileName);
      acc[fileName] = config;
      return acc;
    },
    {}
  );
  resultingConfig.then((r: any) => console.log(JSON.stringify(r)));
  // console.log(`resultingConfig , ${resultingConfig}`)
});
