const express = require("express");
const { findOne, getCollection, write } = require("./mongo-client");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/packages/:packageName", async (req, res) => {
  const packageName = req.params["packageName"];
  const collection = await getCollection();

  // await write(collection);
  const result = await findOne(collection, packageName);
  console.log("server result: ", result);
  if (result) {
    res.send(`${result.readmeContents}`);
  } else {
    res.send(`No package found`);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
