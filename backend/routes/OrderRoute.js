const express = require('express');

const authController = require('../controllers/authController');
const orderController = require('../controllers/OrderController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/create', orderController.createOrder);
router.get('/getOrders', orderController.getOrders);

router.use(authController.restrictTo('admin'));

router.get('/getAllOrders', orderController.getAllOrders);
router.patch('/updateOrder/:id/:status', orderController.updateOrder);

module.exports = router;
