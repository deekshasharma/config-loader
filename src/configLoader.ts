import FileHound from 'filehound';

export const findConfigFiles = (path = './') => {
  const getJsonFiles = () =>
    FileHound.create().paths(path).match('*.json').find();
  const getYamlFiles = () =>
    FileHound.create().paths(path).match('*.yaml').find();
  const getTomlFiles = () =>
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
