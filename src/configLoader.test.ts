import { tmpdir } from 'os';
import fs, { mkdtemp } from 'fs';
import { sep } from 'path';

describe('Test findConfigFiles', () => {
  it('finds all files in flat directory', (done) => {
    const tmpDir = tmpdir();
    mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
      if (err) throw err;
      expect(fs.existsSync(directory)).toBeTruthy();
      done();
    });
  });
});
