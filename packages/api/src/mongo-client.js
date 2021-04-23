const { connect } = require("mongodb");

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://mongodb_container:27017";

const getCollection = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
    .then((lib) => {
      console.log("MongoDB Connected");
      return lib;
    })
    .catch((err) => {
      console.log(err);
    });

  if (!client) {
    console.log("no client");
    return;
  }

  const db = client.db("testdb");
  const collection = db.collection("users");

  return collection;
};

async function write(collection, data) {
  try {
    // const data = { name: "Ryan", meta: "baby worked" }
    await collection.insertOne(data);
  } catch (err) {
    console.log(err);
  }
}

async function findOne(collection) {
  try {
    let query = { name: "Ryan" };
    let res = await collection.findOne(query);
    console.log("client result: ", res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getCollection,
  findOne,
  write,
};
