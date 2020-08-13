const { MongoClient } = require("mongodb");

async function connectToMongoDB(req, res, next) {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db("tv-series-server");
    const collectionTvSeries = database.collection("tvseries");

    req.collectionTvSeries = collectionTvSeries;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToMongoDB;
