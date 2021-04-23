const { createReadStream, statSync, unlinkSync } = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { pipeline } = require("stream");
const tar = require("tar");

const apiUrl = "http://localhost:4000/upload";

async function sendPackage(repoName) {
  const filePath = `${process.cwd()}/${repoName}.tar.gz`;

  const form = new FormData();
  const stats = statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = createReadStream(filePath);
  form.append("file", fileStream, { knownLength: fileSizeInBytes });

  const options = {
    method: "POST",
    credentials: "include",
    body: form,
  };

  return fetch(apiUrl, { ...options })
    .then((res) => res.json())
    .then((json) => {
      console.log(`API response: "${json.message}"`);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
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

  await packageRepo(repoName);

  await sendPackage(repoName);

  // remove file
  unlinkSync(`${repoName}.tar.gz`);
}

run();
