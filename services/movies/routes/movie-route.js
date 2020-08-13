const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movie-controller.js')

router.get('/', MovieController.read)
router.post('/', MovieController.write)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)

module.exports = router