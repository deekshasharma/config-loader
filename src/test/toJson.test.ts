import { tmpdir } from 'os';
import fs, { mkdtemp } from 'fs';
import { sep } from 'path';
import { convertToJson } from '../toJson';

describe('Test Yaml2Json', () => {
  it('reads YAML file with flat structure correctly', async () => {
    const tmpDir = tmpdir();
    const tmpDirPath = `${tmpDir}${sep}`;
    const fileName = 'one';
    type JsonType = {
      [key: string]: {
        hello: number;
        world: string;
      };
    };
    mkdtemp(tmpDirPath, async (err, directory) => {
      const json = { hello: 1, world: '2' };
      const jsonFilePath = `${directory}/${fileName}.yaml`;
      fs.writeFileSync(jsonFilePath, JSON.stringify(json));
      const jsonObject = (await convertToJson(
        jsonFilePath,
        fileName,
        'yaml'
      )) as JsonType;
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
    mkdtemp(tmpDirPath, async (err, directory) => {
      const json = {
        hello: 1,
        world: '2',
        nested: { fruit: 'banana', color: { base: 'yellow', stripe: 'black' } }
      };
      const jsonFilePath = `${directory}/${fileName}.yaml`;
      fs.writeFileSync(jsonFilePath, JSON.stringify(json));
      const jsonObject = (await convertToJson(
        jsonFilePath,
        fileName,
        'yaml'
      )) as JsonType;
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
