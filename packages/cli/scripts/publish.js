#!/usr/bin/env node

const { unlinkSync, readFile } = require("fs");
const tar = require("tar");
const { promisify } = require("util");
const nano = require("nano")("http://localhost:5984");

const readFileAsync = promisify(readFile);

async function sendPackage(repoName, readmeContents) {
  const tarballName = `${repoName}.tar.gz`;
  const filePath = `${process.cwd()}/${tarballName}`;

  const tarballData = await readFileAsync(filePath);

  const registry = nano.db.use("registry");
  let response;
  try {
    const docName = repoName;

    // tried with "registry.multipart.insert" but multipart errors
    const response = await registry.insert({ readmeContents }, docName);
    await registry.attachment.insert(
      docName,
      tarballName,
      tarballData,
      "application/zip",
      { rev: response.rev }
    );
  } catch (e) {
    console.log("ERROR:", e);
  }
  console.log("RESPONSE SUCCESS:", response);
}

async function packageRepo(repoName) {
  try {
    await tar.create(
      {
        gzip: true,
        file: `${repoName}.tar.gz`,
        cwd: process.cwd(),
      },
      ["./"]
      // [`../${repoName}`] // grab name of repo
    );
  } catch (e) {
    console.log("gzip ERROR: ", e.message);
  }
}

async function run() {
  const repoName = require(`${process.cwd()}/package.json`).name;

  const readmeContents = await readFileAsync(`${process.cwd()}/README.md`, {
    encoding: "utf8",
  });

  await packageRepo(repoName);

  await sendPackage(repoName, readmeContents);

  // remove file
  unlinkSync(`${repoName}.tar.gz`);
}

run();
