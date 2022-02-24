import FileHound from 'filehound';

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
