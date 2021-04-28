const express = require("express");
const { findOne, getCollection } = require("./mongo-client");
const showdown = require("showdown");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/packages/:packageName", async (req, res) => {
  const packageName = req.params["packageName"];
  const collection = await getCollection();

  const result = await findOne(collection, packageName);
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
