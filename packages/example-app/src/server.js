const express = require("express");
const exampleLib = require("example-lib");

module.exports.start = () => {
  console.log("server start");
  console.log("express function", express.urlencoded);
  return exampleLib();
};
