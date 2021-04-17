const { connect } = require("mongodb");

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://mongodb_container:27017";

const connectClient = async () => {
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

  return client;
};

async function findOne() {
  const client = await connectClient();

  try {
    console.log("connect db");
    const db = client.db("testdb");
    let collection = db.collection("users");
    console.log("query");
    let query = { name: "Bill" };
    let res = await collection.findOne(query);
    // let res = await collection.find();
    console.log("client result: ", res);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

async function write() {}
module.exports = {
  findOne,
};
