const express = require("express");

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

app.post("/upload", async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);
  } catch (error) {
    console.log("ERROR", error.message);
  }

  if (req.file == undefined) {
    return res.status(400).send({ message: "Please upload a file!" });
  }

  res.status(200).send({
    message: "Uploaded the file successfully: " + req.file.originalname,
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
