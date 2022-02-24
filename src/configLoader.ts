import FileHound from 'filehound';
import yaml from 'js-yaml';
import fs from 'fs';

type ConfigFileInterface = {
  json: string[];
  yaml: string[];
  toml: string[];
};

export const findConfigFiles = (path = './'): Promise<ConfigFileInterface> => {
  const getJsonFiles = (): Promise<string[]> =>
    FileHound.create().paths(path).match('*.json').find();
  const getYamlFiles = (): Promise<string[]> =>
    FileHound.create().paths(path).match('*.yaml').find();
  const getTomlFiles = (): Promise<string[]> =>
    FileHound.create().paths(path).match('*.toml').find();

  return Promise.all([getJsonFiles(), getYamlFiles(), getTomlFiles()]).then(
    (files) => {
      return {
        json: files[0],
        yaml: files[1],
        toml: files[2]
      };
    }
  );
};

export const yaml2Json = (inputFilePath: string) => {
  return yaml.load(fs.readFileSync(inputFilePath, { encoding: 'utf-8' }));
};
