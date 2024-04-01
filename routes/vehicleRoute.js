const express = require('express');
const router = express.Router();
const vehicles = require('../Controllers/vehicleController');

// CREATE registered user
router.post('/', vehicles.create);

// READ registered user by id
router.get('/:id', vehicles.findOne);

// READ ALL registered users
router.get('/', vehicles.findAll);

// UPDATE registered user by id
router.put('/:id',vehicles.update);

// DELETE registered user by id
router.delete('/:id', vehicles.delete);

// DELETE ALL registered users
router.delete('/', vehicles.deleteAll);

module.exports = router;
