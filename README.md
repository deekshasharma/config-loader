# How to run
- Either clone or fork the following repository `git@github.com:<YOUR_GITHUB_USER>/config-loader.git`.
- Make sure you are using the LTS version of Node to get the project up and running without any issues. This code is tested on Node version `v16.13.2`
- Install dependencies using `npm install`.
- To test the implementation, run `npm test`. You should be able to run all the tests and they should pass. The `test/` directory contains the sample files (json, toml, yaml) which are being used by the test cases.
- The main function `getConfig(path) `takes as parameter the path to start searching the files from. 
It recursively searches all nested directories as well.
- To run the function,  do the following
  - Uncomment L22 in [index.ts](src/index.ts)
  - On the command-line, run `npx ts-node src/index.ts`
  - You should be able to get the JSON output on the console.

# FAQs

## Which `tsconfig.json` file is used by `ts-node`?
If no tsconfig.json is loaded from disk, ts-node will use the newest recommended defaults from [@tsconfig/bases](https://github.com/tsconfig/bases/) compatible with your node and typescript versions.
To log the configuration being used, run the following on the CLI.

```shell
npx ts-node --show-config
```

To log node and typescript versions, type the command below.
```shell
npx ts-node -vv
```
**Note**: Since `ts-node` is installed locally, it should be used with `npx` prefix.

## How to start the app in development mode?
To start the project in `dev` mode, you should run `npm run dev`.
Since this project uses `nodemon` to automatically restart the application on file changes, so we added the following configuration in the `nodemon.json` file.
```shell
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node --project tsconfig.json ./src/index.ts"
}
```

The `package.json` `dev` script runs `nodemon` as shown below. 

```shell
"dev": "nodemon"
```

## How to add a plugin to my current `eslint` configuration?
With ESLint, you can add a number of features to your config file via plugins. Please refer to [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) to make your eslint configuration richer.
Currently, in this project we have only 2 rules in our `.eslintrc` file. 

1) To disallow `console.log` statements
2) To disallow the use of `for`, `for-in`, `while` and `do-while` loops. Instead, use `map` and `forEach`.

## How to build the project for deployment?

## `console.log` is not allowed and throws lint errors. What to do?
If the application using your module absolutely needs to log something important, then you can use `console`. To do so, remove the `no-console` rule from the `.eslintrc` file. 
If you don't necessarily need to use `console` then log everything using `debug`.
**Note:** `debug` writes to stderr, not stdout, so if the logs are picked up based on different sources, then these debug logs will end up in the `stderr` stream.


