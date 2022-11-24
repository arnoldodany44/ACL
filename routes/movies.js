const express = require('express');
const router = express.Router();
const controller = require("../controllers/movies");

router.get('/', controller.getMovies);
router.get('/:id', controller.getMovie);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;