const express = require('express');
const router = express.Router();
const feedbacks = require('../Controllers/feedbackController');

// CREATE registered user
router.post('/', feedbacks.create);

// READ registered user by id
router.get('/:id',feedbacks.findOne);

router.get('/', )
// READ ALL registered users
router.get('/', feedbacks.findAll);

// UPDATE registered user by id
router.put('/:id',feedbacks.update);

// DELETE registered user by id
router.delete('/:id', feedbacks.delete);

// DELETE ALL registered users
router.delete('/', feedbacks.deleteAll);



module.exports = router;
