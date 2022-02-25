import { getConfig } from '../index';

describe('Test getConfig', () => {
  it('Load multiple format files and creates config', async () => {
    const config = await getConfig('./src/test/test-data/');
    expect(config).toHaveProperty('json-sample');
    expect(config).toHaveProperty('toml-collect');
    expect(config).toHaveProperty('toml-random');
    expect(config).toHaveProperty('yaml-test');
  });
});
