const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  // get the items and user
  const { quantity, product, totalPrice, now } = req.body;
  const userId = req.user._id;

  if (!quantity) {
    return next(new AppError('quantity cannot be empty', 400));
  }

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (!totalPrice) {
    return next(new AppError('Total price cannot be empty', 400));
  }

  // check if the product is buy now
  if (now === true) {
    const newCart = new Cart({
      user: userId,
      product: product.id,
      quantity: quantity,
      totalPrice: totalPrice,
      now: true,
      paid: true
    });
    await newCart.save();

    return res.status(201).json({
      status: 'success',
      data: newCart
    });
  }

  // Check if the product is already in the user's cart
  const existingCartItem = await Cart.findOne({
    user: userId,
    product: product.id,
    paid: false
  });

  if (existingCartItem) {
    //if the product is in the cart, update the cart
    existingCartItem.quantity = quantity;
    existingCartItem.totalPrice = totalPrice;
    await existingCartItem.save();
    return res.json(existingCartItem);
  } else {
    // If the product is not in the cart, create a new cart item
    const newCartItem = new Cart({
      user: userId,
      product: product.id,
      quantity: quantity,
      totalPrice: totalPrice,
      now: false
    });
    await newCartItem.save();
    return res.json(newCartItem);
  }
});

exports.removeFromFavorites = catchAsync(async (req, res, next) => {
  const { cartID } = req.body;
  const userId = req.user.id;

  // 1) Check if cartID exists
  if (!cartID) {
    return next(new AppError('Please provide a cartID', 400));
  }

  // 2) Check if the favorite recipe exists in user's favorites
  const existingFavorite = await Cart.findOne({
    _id: cartID,
    user: userId
  });
  if (!existingFavorite) {
    return next(new AppError('This Item does not exist in your cart', 400));
  }

  // 3) Remove the recipe from user's favorites
  await Cart.findOneAndDelete({
    _id: cartID,
    user: userId
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUserFavorites = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const userCart = await Cart.find({ user: userId, paid: false });

  res.status(200).json({
    status: 'success',
    data: {
      carts: userCart.map(favorite => favorite)
    }
  });
});
