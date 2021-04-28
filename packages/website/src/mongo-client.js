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
  const collection = db.collection("packages");

  return collection;
};

async function findOne(collection, packageName) {
  try {
    let query = { packageName }; // : "example-lib" };
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
};
