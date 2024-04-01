const express = require('express');
const router = express.Router();
const caterings = require('../Controllers/cateringController');

// CREATE registered user
router.post('/', caterings.create);

// READ registered user by id
router.get('/:id',caterings.findOne);

// READ ALL registered users
router.get('/', caterings.findAll);

// UPDATE registered user by id
router.put('/:id',caterings.update);

// DELETE registered user by id
router.delete('/:id', caterings.delete);

// DELETE ALL registered users
router.delete('/', caterings.deleteAll);

module.exports = router;
