const express = require("express");
const router = express.Router();
const TvSeriesController = require("../controllers/tv-series-controller.js");

router.get("/", TvSeriesController.read);
router.get("/:id", TvSeriesController.readById)
router.post("/", TvSeriesController.write);
router.put("/:id", TvSeriesController.update);
router.delete("/:id", TvSeriesController.delete);

module.exports = router;
