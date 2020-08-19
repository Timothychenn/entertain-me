require('dotenv').config()

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const router = require("./routes/index.js");
const connectToMongoDB = require('./helpers/connect-mongodb.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(connectToMongoDB)
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Movies - Current PORT: ${PORT}`);
});
