/* eslint-disable no-console */
import { findConfigFiles } from './configLoader';

findConfigFiles().then((files) => console.log(files));
findConfigFiles('src').then((files) => console.log(files));
