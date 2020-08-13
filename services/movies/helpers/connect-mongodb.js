const { MongoClient } = require("mongodb");

async function connectToMongoDB(req, res, next) {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db("entertainme-server");
    const collectionMovies = database.collection("movies");

    req.collectionMovies = collectionMovies;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToMongoDB;
