const express = require("express");
const router = express.Router();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

router.get("/", async (req, res, next) => {
  const moviesCache = await redis.get("movies");

  if (moviesCache) {
    res.status(200).json(JSON.parse(moviesCache));
  } else {
    try {
      const response = await axios.get("http://localhost:3001/movies");
      await redis.set("movies", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const response = await axios.post("http://localhost:3001/movies", {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });

    await redis.del("movies");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const currentId = req.params.id;

    const response = await axios.put(
      `http://localhost:3001/movies/${currentId}`,
      {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      }
    );

    await redis.del("movies");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const currentId = req.params.id;
    const response = await axios.delete(
      `http://localhost:3001/movies/${currentId}`
    );

    await redis.del("movies");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
