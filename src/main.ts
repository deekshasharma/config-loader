import { findConfigFiles } from './configLoader';

// eslint-disable-next-line no-console
findConfigFiles().then((files) => console.log(files));
