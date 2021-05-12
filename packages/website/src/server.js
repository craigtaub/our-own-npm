const express = require("express");
const showdown = require("showdown");
const nano = require("nano")("http://couchdb_container:5984"); // no auth for GET

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// couchdb
async function findOne(packageName) {
  try {
    const registry = nano.db.use("registry");
    const doc = await registry.get(packageName);
    console.log("client result: ", doc);
    return doc;
  } catch (err) {
    console.log("ERROR: ", err.message);
  }
}

// App
const app = express();
app.get("/packages/:packageName", async (req, res) => {
  const packageName = req.params["packageName"];

  const result = await findOne(packageName);
  console.log("server result: ", result);
  if (result) {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(result.readmeContents);
    res.send(html);
  } else {
    res.send(`No package found`);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
