console.log("init");

const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

const filePath = `${process.cwd()}/tarballs/test-package.tar.gz`;

const form = new FormData();
const stats = fs.statSync(filePath);
const fileSizeInBytes = stats.size;
const fileStream = fs.createReadStream(filePath);
form.append("file", fileStream, { knownLength: fileSizeInBytes });

const apiUrl = "http://localhost:4000/upload";
const options = {
  method: "POST",
  credentials: "include",
  body: form,
};

fetch(apiUrl, { ...options })
  .then((res) => {
    if (res.ok) {
      console.log("SENT OK");
    }
    // throw res;
  })
  .catch((error) => {
    console.log("ERROR: ", error);
  });
