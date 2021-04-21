const express = require("express");

module.exports.start = () => {
  console.log("server start");
  console.log("express function", express.urlencoded);
  return "some value";
};
