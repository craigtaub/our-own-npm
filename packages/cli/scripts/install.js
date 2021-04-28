const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const tar = require("tar");
const fs = require("fs");

const writeFilePromise = promisify(writeFile);
const apiUrl = "http://localhost:4000/download/";

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
  return fetch(apiUrl + repoName)
    .then((x) => x.arrayBuffer())
    .then((x) => writeFilePromise(outputPath, Buffer.from(x)))
    .catch((e) => console.log("Download Error: ", e.message));
}

async function run() {
  const myArgs = process.argv.slice(2);
  const repoName = myArgs[0];
  await downloadPackage(repoName);

  await extractPackage(repoName);

  fs.unlinkSync(outputPath); // remove tar
  console.log("downloaded");
}

run();
