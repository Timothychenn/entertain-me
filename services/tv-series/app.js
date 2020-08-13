const express = require("express");
const app = express();
const PORT = 3002;
const router = require("./routes/index.js");
const connectToMongoDB = require('./helpers/connect-mongodb.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(connectToMongoDB)
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Tv Series - Current PORT: ${PORT}`);
});
