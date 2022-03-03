/* eslint-disable no-console */
import { tmpdir } from 'os';
import fs, { mkdtemp } from 'fs';
import { sep } from 'path';
import { convertToJson } from '../toJson';

describe('Test Toml2Json', () => {
  it.skip('reads TOML file correctly', async () => {
    const config = await convertToJson(
      './src/test/test-data/toml-collect.toml'
    );
    expect(config).toHaveProperty('toml-collect', {
      batchSizes: {
        msearch: 200,
        index: 200,
        mget: 200,
        get: 200,
        search: 200,
        bulk: 200
      },
      timeouts: {
        index: 30,
        get: 30,
        bulk: 30,
        mget: 30,
        msearch: 30,
        search: 30
      }
    });
  });
});

describe('Test Json2Json', () => {
  it.skip('reads JSON file correctly', async () => {
    const config = await convertToJson('./src/test/test-data/json-sample.json');
    expect(config).toHaveProperty('json-sample', {
      quiz: {
        sport: {
          q1: {
            question: 'Which one is correct team name in NBA?',
            options: [
              'New York Bulls',
              'Los Angeles Kings',
              'Golden State Warriros',
              'Huston Rocket'
            ],
            answer: 'Huston Rocket'
          }
        },
        maths: {
          q1: {
            question: '5 + 7 = ?',
            options: ['10', '11', '12', '13'],
            answer: '12'
          },
          q2: {
            question: '12 - 8 = ?',
            options: ['1', '2', '3', '4'],
            answer: '4'
          }
        }
      }
    });
  });
});

describe('Test Yaml2Json', () => {
  it.skip('reads YAML file with flat structure correctly', async () => {
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
      const jsonObject = (await convertToJson(jsonFilePath)) as JsonType;
      expect(Object.entries(jsonObject).length).toEqual(1);
      expect(jsonObject).toHaveProperty(fileName);
      const returnedJson = jsonObject[fileName];
      expect(returnedJson).toHaveProperty('hello', 1);
      expect(returnedJson).toHaveProperty('world', '2');
    });
  });

  it.skip('reads YAML file with nested structure correctly', () => {
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
      const jsonObject = (await convertToJson(jsonFilePath)) as JsonType;
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

describe('Test namespaced keys', () => {
  const json = { Hello: 'World' };
  it.skip('returns directory names in a path', () => {
    const getNestedPath = (pathToFile: string) => {
      const removeRelativePaths = (paths: string[]) =>
        paths.filter((p) => {
          const trimmedPath = p.trim();
          return (
            trimmedPath.length > 0 &&
            trimmedPath !== '.' &&
            trimmedPath !== '..'
          );
        });
      const pathSplits = pathToFile.split(sep);
      return removeRelativePaths(pathSplits.slice(0, pathSplits.length - 1));
    };
    const mergeJsonWithKeys = (pathToFile: string) => {
      const keys = getNestedPath(pathToFile);
      console.log(keys);
      return keys.reduceRight((acc: any, value: string) => {
        return { [value]: acc };
      }, json);
    };
    console.log(
      JSON.stringify(mergeJsonWithKeys('/src/test/test-data/json-sample.json'))
    );
  });
});
