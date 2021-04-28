# Our own npm

## Packages

- `/cli` -> scripts to install or publish. connects to api
- `/api` -> connects to database. Package zipped stored in filesystem.
- `/website` -> connects to api
- `/example-lib` -> an lib with a function which returns text
- `/example-app` -> small express app which imports and prints `example-lib`

## Example usage

`make up`

### 1. Check package on website

- `open http://localhost:3000/packages/example-lib` -> see package does not exist

### 2. Publish package then check website

- `cd ../../packages/example-lib`
- `node ../cli/scripts/publish.js`
- `ls ../api/tarballs` -> should list zipped package (`example-lib.tar.gz`)
- `open http://localhost:3000/packages/example-lib`

### 3. Use package

- `cd ../../packages/example-app`
- `npm start` -> see missing package error
- `node ../cli/scripts/install.js example-lib`
- `npm start` -> WORKS
