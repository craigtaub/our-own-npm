const express = require("express");

// await
const { findOne } = require("./mongo-client");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", async (req, res) => {
  const result = await findOne();
  console.log("server result: ", result);
  res.send(`Hello World ${result.meta}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
