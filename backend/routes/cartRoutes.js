const express = require('express');

const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/create', cartController.addToCart);
router.get('/', cartController.getUserFavorites);
router.delete('/remove', cartController.removeFromFavorites);

module.exports = router;
