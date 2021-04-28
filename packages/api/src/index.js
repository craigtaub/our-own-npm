const express = require("express");
const tar = require("tar");
const fs = require("fs");
const rimraf = require("rimraf");
const { promisify } = require("util");

const { getCollection, write } = require("./mongo-client");

const readFileAsync = promisify(fs.readFile);

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", async (req, res) => {
  res.send(`Hello api World`);
});

// Upload file middleware
const cors = require("cors");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var corsOptions = {
  origin: "http://localhost:4000",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/tarballs/`);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);

app.get("/download/:packageName", (req, res) => {
  const path = `${process.cwd()}/tarballs/${req.params.packageName}.tar.gz`;
  res.download(path);
});

app.post("/upload", async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);
  } catch (error) {
    console.log("ERROR", error.message);
  }

  if (req.file == undefined) {
    return res.status(400).send({ message: "Please upload a file!" });
  }

  // unzip file into tmp folder
  const file = req.file.filename;

  const zipExtractFolder = `${process.cwd()}/tmp`;
  if (!fs.existsSync(zipExtractFolder)) {
    // create temp extraction folder
    fs.mkdirSync(zipExtractFolder);
  }
  try {
    await tar.extract(
      {
        gzip: true,
        file: `tarballs/${file}`,
        // file: "tarballs/test-package.tar.gz", // test
        cwd: zipExtractFolder, // current extract
      }
      // [`tarballs/${file}`]
    );
    console.log("Extract complete");
  } catch (e) {
    console.log("Extract error: ", e.message);
  }

  // details from package
  const pkgName = require(`${zipExtractFolder}/package.json`).name;
  const readmeContents = await readFileAsync(`${zipExtractFolder}/README.md`, {
    encoding: "utf8",
  });
  console.log("pkgName", pkgName);
  console.log("readme", readmeContents);
  // send to mongo
  const collection = await getCollection();
  const data = { packageName: pkgName, readmeContents };
  await write(collection, data);

  // remove tmp folder
  rimraf.sync(zipExtractFolder);

  res.status(200).send({
    message: "Uploaded the file successfully: " + req.file.originalname,
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
