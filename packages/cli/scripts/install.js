const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const tar = require("tar");
const fs = require("fs");

const writeFilePromise = promisify(writeFile);
const apiUrl = "http://localhost:5984/registry";

const outputPath = `${process.cwd()}/tmp.tar.gz`;

async function extractPackage(repoName) {
  const zipExtractFolder = `${process.cwd()}/node_modules/${repoName}`;

  if (!fs.existsSync(zipExtractFolder)) {
    // create package in node_mods
    fs.mkdirSync(zipExtractFolder);
  }
  try {
    await tar.extract({
      gzip: true,
      file: "tmp.tar.gz", // loc
      cwd: zipExtractFolder, // current extract
    });
    console.log("Extract complete");
  } catch (e) {
    console.log("Extract error: ", e.message);
  }
}
async function downloadPackage(repoName) {
  return fetch(`${apiUrl}/${repoName}/${repoName}.tar.gz`)
    .then((x) => x.arrayBuffer())
    .then((x) => writeFilePromise(outputPath, Buffer.from(x)))
    .catch((e) => console.log("Download Error: ", e.message));
}

async function run() {
  const package = require(`${process.cwd()}/package.json`);
  // process each dep
  Object.keys(package.ourDeps).map(async (repoName) => {
    await downloadPackage(repoName);

    await extractPackage(repoName);

    fs.unlinkSync(outputPath); // remove tar
    console.log(`Downloaded: ${repoName}`);
  });
}

run();
