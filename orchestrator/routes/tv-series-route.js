const express = require("express");
const router = express.Router();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

router.get("/", async (req, res, next) => {
  const tvSeriesCache = await redis.get("tvseries");

  if (tvSeriesCache) {
    res.status(200).json(JSON.parse(tvSeriesCache));
  } else {
    try {
      const response = await axios.get("http://localhost:3002/tvseries");

      await redis.set("tvseries", JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const response = await axios.post("http://localhost:3002/tvseries", {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    });

    await redis.del("tvseries");
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
      `http://localhost:3002/tvseries/${currentId}`,
      {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      }
    );

    await redis.del("tvseries");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const currentId = req.params.id;
    const response = await axios.delete(
      `http://localhost:3002/tvseries/${currentId}`
    );

    await redis.del("tvseries");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
