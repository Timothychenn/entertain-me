const express = require('express')
const router = express.Router()
const TvSeriesRouter = require('./tv-series-route.js')

router.use('/tvseries', TvSeriesRouter)

module.exports = router