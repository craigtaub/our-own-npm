const express = require("express");
const { findOne, getCollection, write } = require("./mongo-client");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", async (req, res) => {
  const collection = await getCollection();

  await write(collection);
  const result = await findOne(collection);
  console.log("server result: ", result);
  res.send(`Hello website World ${result.meta}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
