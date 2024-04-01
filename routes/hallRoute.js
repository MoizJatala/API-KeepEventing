const express = require('express');
const router = express.Router();
const halls = require('../Controllers/hallController');

// CREATE registered user
router.post('/',halls.create);

// READ registered user by id
router.get('/:id',halls.findOne);

// READ ALL registered users
router.get('/', halls.findAll);

// UPDATE registered user by id
router.put('/:id',halls.update);

// DELETE registered user by id
router.delete('/:id', halls.delete);

// DELETE ALL registered users
router.delete('/', halls.deleteAll);

module.exports = router;
