const express = require('express');
const router = express.Router();
const salons = require('../Controllers/salonController');

// CREATE registered user
router.post('/', salons.create);

// READ registered user by id
router.get('/:id', salons.findOne);

// READ ALL registered users
router.get('/', salons.findAll);

// UPDATE registered user by id
router.put('/:id',salons.update);

// DELETE registered user by id
router.delete('/:id',salons.delete);

// DELETE ALL registered users
router.delete('/',salons.deleteAll);

module.exports = router;
