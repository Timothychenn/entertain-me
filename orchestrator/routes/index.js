const express = require("express");
const Redis = require("ioredis");
const redis = new Redis();
const router = express.Router();
const MovieRoute = require("./movie-route.js");
const TvSeriesRoute = require("./tv-series-route.js");
const axios = require("axios");

router.get("/", async (req, res, next) => {
  const moviesCache = await redis.get("movies");
  const tvSeriesCache = await redis.get("tvseries");

  if (moviesCache && tvSeriesCache) {
    console.log("data dari redis");
    res
      .status(200)
      .json({
        movies: JSON.parse(moviesCache),
        tvSeries: JSON.parse(tvSeriesCache),
      });
  } else {
    try {
      const responseMovies = await axios.get("http://localhost:3001/movies");
      const responseTvSeries = await axios.get(
        "http://localhost:3002/tvseries"
      );

      await redis.set("movies", JSON.stringify(responseMovies.data));
      await redis.set("tvseries", JSON.stringify(responseTvSeries.data));
      res
        .status(200)
        .json({ movies: responseMovies.data, tvSeries: responseTvSeries.data });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.use("/movies", MovieRoute);
router.use("/tvseries", TvSeriesRoute);

module.exports = router;
