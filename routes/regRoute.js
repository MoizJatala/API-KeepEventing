const express = require('express');
const router = express.Router();
const registeredService = require('../Controllers/RegController.js');

// CREATE registered user
router.post('/',registeredService.create);

// READ registered user by id
router.get('/:id',registeredService.findOne);

// READ ALL registered users
router.get('/', registeredService.findAll);

// UPDATE registered user by id
router.put('/:id',registeredService.update);

// DELETE registered user by id
router.delete('/:id',registeredService.delete);

// DELETE ALL registered users
router.delete('/', registeredService.deleteAll);

// READ ALL Caterings of a user
router.get('/:id/caterings', registeredService.findALLCaterings);

// READ ALL Hallss of a user
router.get('/:id/halls', registeredService.findALLHalls);

// READ ALL dresses of a user
router.get('/:id/dresses', registeredService.findALLDress);

// READ ALL Salons of a user
router.get('/:id/salons', registeredService.findALLSalons);

// READ ALL Vehicles of a user
router.get('/:id/vehicles', registeredService.findALLVehicles);

// READ ALL Feedback of a user
router.get('/:id/feedback', registeredService.findALLFeedback);

module.exports = router;
