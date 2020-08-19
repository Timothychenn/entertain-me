const express = require('express')
const router = express.Router()
const MovieRoute = require('./movie-route.js')

router.use('/movies', MovieRoute)

module.exports = router