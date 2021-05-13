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

### 2. Setup database and CLI

- `make db`
- `cd packages/cli && npm install -g .` -> install 2 CLI scripts globally (see `bin` inside `package.json`)

### 3. Publish package then check website

- `cd ../example-lib && our-npm-publish` -> publish the `example-lib` package to registry
- `GET http://localhost:5984/registry/example-lib/example-lib.tar.gz` -> registry tarball package tarball
- `GET http://localhost:3000/packages/example-lib` -> package README on website

### 4. Use package

- `cd ../example-app`
- `npm start` -> see missing package error
- `our-npm-install` -> install packages from `package.json` -> `ourDeps` list
- `npm start` -> package found, now it works
