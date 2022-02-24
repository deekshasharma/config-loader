import { tmpdir } from 'os';
import fs, { mkdtemp } from 'fs';
import { sep } from 'path';
import rimraf from 'rimraf';
import { findConfigFiles, yaml2Json } from './configLoader';

describe('Test findConfigFiles', () => {
  it('finds all files in flat directory', (done) => {
    const tmpDir = tmpdir();
    const tmpDirPath = `${tmpDir}${sep}`;
    mkdtemp(tmpDirPath, (err, directory) => {
      if (err) throw err;
      expect(fs.existsSync(directory)).toBeTruthy();
      fs.writeFileSync(`${directory}/one.json`, '');
      fs.writeFileSync(`${directory}/two.yaml`, '');
      fs.writeFileSync(`${directory}/three.toml`, '');
      findConfigFiles(directory)
        .then((files) => {
          expect(Object.entries(files).length).toEqual(3);
          expect(files.json).toHaveLength(1);
          expect(files.yaml).toHaveLength(1);
          expect(files.toml).toHaveLength(1);
        })
        .finally(() => {
          rimraf(directory, () => done()); //Delete the temp directory at the end of the test.
        });
    });
  });

  it('finds all files in nested directory structure', (done) => {
    const tmpDir = tmpdir();
    const tmpDirPath = `${tmpDir}${sep}`;
    mkdtemp(tmpDirPath, (err, directory) => {
      if (err) throw err;
      expect(fs.existsSync(directory)).toBeTruthy();
      fs.writeFileSync(`${directory}/one.json`, '');

      mkdtemp(`${directory}/l1`, (err, l1Dir) => {
        expect(fs.existsSync(l1Dir)).toBeTruthy();
        fs.writeFileSync(`${l1Dir}/two.yaml`, '');
        mkdtemp(`${l1Dir}/l2`, (err, l2Dir) => {
          expect(fs.existsSync(l2Dir)).toBeTruthy();
          fs.writeFileSync(`${l2Dir}/three.toml`, '');

          findConfigFiles(directory)
            .then((files) => {
              expect(Object.entries(files).length).toEqual(3);
              expect(files.json).toHaveLength(1);
              expect(files.yaml).toHaveLength(1);
              expect(files.toml).toHaveLength(1);
            })
            .finally(() => {
              rimraf(directory, () => done());
            });
        });
      });
    });
  });
});

describe('Test Yaml2Json', () => {
  it('reads YAML file with flat structure correctly', () => {
    const tmpDir = tmpdir();
    const tmpDirPath = `${tmpDir}${sep}`;
    const fileName = 'one';
    type JsonType = {
      [key: string]: {
        hello: number;
        world: string;
      };
    };
    mkdtemp(tmpDirPath, (err, directory) => {
      const json = { hello: 1, world: '2' };
      const jsonFilePath = `${directory}/${fileName}.yaml`;
      fs.writeFileSync(jsonFilePath, JSON.stringify(json));
      const jsonObject = yaml2Json(jsonFilePath) as JsonType;
      expect(Object.entries(jsonObject).length).toEqual(1);
      expect(jsonObject).toHaveProperty(fileName);
      const returnedJson = jsonObject[fileName];
      expect(returnedJson).toHaveProperty('hello', 1);
      expect(returnedJson).toHaveProperty('world', '2');
    });
  });

  it('reads YAML file with nested structure correctly', () => {
    const tmpDir = tmpdir();
    const tmpDirPath = `${tmpDir}${sep}`;
    const fileName = 'one';
    type Nested = {
      fruit: string;
      color: {
        base: string;
        stripe: string;
      };
    };
    type JsonType = {
      [key: string]: {
        hello: number;
        world: string;
        nested: Nested;
      };
    };
    mkdtemp(tmpDirPath, (err, directory) => {
      const json = {
        hello: 1,
        world: '2',
        nested: { fruit: 'banana', color: { base: 'yellow', stripe: 'black' } }
      };
      const jsonFilePath = `${directory}/${fileName}.yaml`;
      fs.writeFileSync(jsonFilePath, JSON.stringify(json));
      const jsonObject = yaml2Json(jsonFilePath) as JsonType;
      expect(Object.entries(jsonObject).length).toBe(1);
      const returnedJson = jsonObject[fileName];
      expect(returnedJson).toHaveProperty('hello', 1);
      expect(returnedJson).toHaveProperty('world', '2');
      expect(returnedJson).toHaveProperty('nested');
      expect(returnedJson.nested).toHaveProperty('fruit', 'banana');
      expect(returnedJson.nested.color).toHaveProperty('base', 'yellow');
      expect(returnedJson.nested.color).toHaveProperty('stripe', 'black');
    });
  });
});
