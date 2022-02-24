import { tmpdir } from 'os';
import fs, { mkdtemp } from 'fs';
import { sep } from 'path';
import rimraf from 'rimraf';
import { findConfigFiles } from './configLoader';

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
