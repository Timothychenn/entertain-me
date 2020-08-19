const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movie-controller.js')

router.get('/', MovieController.read)
router.get('/:id', MovieController.readById)
router.post('/', MovieController.write)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)

module.exports = router