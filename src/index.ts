import express from 'express';
import debug from 'debug';

const app = express();
const log: debug.IDebugger = debug('http:debugger');

app.get('/', (req, res) => {
  res.send('Hello there, how are you?');
});

app.listen(3400, () => log('Your application is running on port 3400'));
