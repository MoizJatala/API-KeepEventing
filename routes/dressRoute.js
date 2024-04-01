const express = require('express');
const router = express.Router();
const dresses = require('../Controllers/dressController');

// CREATE registered user
router.post('/', dresses.create);

// READ registered user by id
router.get('/:id', dresses.findOne);

// READ ALL registered users
router.get('/', dresses.findAll);

// UPDATE registered user by id
router.put('/:id',dresses.update);

// DELETE registered user by id
router.delete('/:id', dresses.delete);

// DELETE ALL registered users
router.delete('/', dresses.deleteAll);

module.exports = router;
