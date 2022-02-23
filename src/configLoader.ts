import FileHound from 'filehound';

/*const yaml2Json = () => {
  var inputfile = "infra.yaml",
    //outputfile = 'output.json',
    yaml = require("js-yaml"),
    fs = require("fs"),
    obj = yaml.load(fs.readFileSync(inputfile, { encoding: "utf-8" }));
  console.log(JSON.stringify(obj));
// this code if you want to save
//fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));
};*/

export const findConfigFiles = () => {
  const getJsonFiles = () =>
    FileHound.create().paths('./').match('*.json').find();
  const getYamlFiles = () =>
    FileHound.create().paths('./').match('*.yaml').find();
  const getTomlFiles = () =>
    FileHound.create().paths('./').match('*.toml').find();

  return Promise.all([getJsonFiles(), getYamlFiles(), getTomlFiles()]);
};
