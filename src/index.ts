import { convertTomlToJson, readJSONFile } from './tomlToJson';
import path from 'path';

/**
 * Read TOML file
 */
const tomlFilePath =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/collect.toml';
const extensionToml = path.extname(tomlFilePath);
const tomlFileName = path.basename(tomlFilePath, extensionToml);

convertTomlToJson(tomlFilePath, tomlFileName);

/**
 * Read JSON file
 */
const jsonFilePath =
  '/Users/deekshasharma/Desktop/mindgrep/config-loader/src/sample.json';
const extensionJson = path.extname(jsonFilePath);
const jsonFileName = path.basename(jsonFilePath, extensionJson);
readJSONFile(jsonFilePath, jsonFileName);
