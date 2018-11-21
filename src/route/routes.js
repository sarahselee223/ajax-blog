const express = require('express')
const router = express.Router()
const postController = require('../controls/posts_controls.js')

router.get('/', postController.getAll)

router.get('/:id', postController.getOne)

router.post('/', postController.create)

router.put('/:id', postController.editOne)

router.delete('/:id', postController.deleteOne)

module.exports = router
