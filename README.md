# Our own npm

## Packages

- `/cli` -> scripts to install or publish. connects to CouchDB API
- `/website` -> connects to CouchDB API
- `/example-lib` -> a lib with a function which returns text
- `/example-app` -> small express app which imports and prints `example-lib`

## Example usage

    > make up
    > make reset

### 1. Check package on website

- `GET http://localhost:3000/packages/example-lib` -> see package does not exist

### 2. Publish package then check website

- `cd packages/example-lib`
- `node ../cli/scripts/publish.js`
- `GET http://localhost:5984/registry/example-lib/example-lib.tar.gz` -> registry package tarball
- `GET http://localhost:3000/packages/example-lib` -> package README on website

### 3. Use package

- `cd ../example-app`
- `npm start` -> see missing package error
- `node ../cli/scripts/install.js` -> install packages from `package.json` -> `ourDeps` list
- `npm start` -> package found, now it works
