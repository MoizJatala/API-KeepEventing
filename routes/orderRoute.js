const express = require('express');
const router = express.Router();
const orders = require('../Controllers/orderController');

// CREATE registered user
router.post('/',orders.createOrder);

// READ registered user by id
router.get('/:id',orders.getOrderById);

// READ ALL registered users
router.get('/', orders.getAllOrders);

// UPDATE registered user by id
router.put('/:id',orders.updateOrderById);

// DELETE ALL orders
router.delete('/',orders.deleteAllOrders);

// DELETE registered user by id
router.delete('/:id',orders.deleteOrderById);


module.exports = router;
