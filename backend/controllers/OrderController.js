const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Card = require('../models/CardModel');
const Address = require('../models/addressModel');
const User = require('../models/userModel');

exports.createOrder = catchAsync(async (req, res, next) => {
  //get the cart id
  const cartId = req.body.cartId;
  const user = req.user;
  // validate the cart id
  if (!cartId) {
    return next(new AppError('Please provide a cartId', 400));
  }

  //check if the cart exists
  const cart = await Cart.findById(cartId);
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // get user address and card
  const card = await Card.findOne({ user: user._id });
  const address = await Address.findOne({ user: user._id });

  //create a new order
  const order = await Order.create({
    cartId,
    userId: user._id
  });

  // update the cart
  await Cart.findByIdAndUpdate(cartId, { paid: true });

  // return the new order
  res.status(201).json({
    status: 'success',
    data: {
      order,
      card,
      address
    }
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  // Get the user ID from the authenticated request
  const userId = req.user._id;

  // Find user orders with status 'paid'
  const orders = await Order.find({ userId });

  // Fetch cart details for each order in parallel using Promise.all
  const carts = await Promise.all(
    orders.map(async order => {
      const cart = await Cart.findById(order.cartId);
      return {
        _id: order._id,
        userId: order.userId,
        cartId: cart,
        status: order.status,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
    })
  );

  // Return the orders
  res.status(200).json({
    status: 'success',
    data: carts
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  try {
    // Get all the orders
    const orders = await Order.find();

    // Map through the orders, fetch related data, and return
    const allOrders = await Promise.all(
      orders.map(async order => {
        const [cart, user] = await Promise.all([
          Cart.findById(order.cartId),
          User.findById(order.userId)
        ]);

        if (!cart || !user) {
          // Handle the case where cart or user is not found
          return null; // Skip this order in the final result
        }

        const address = await Address.findOne({ user: user._id });

        return {
          _id: order._id,
          user,
          cart,
          address,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt
        };
      })
    );

    // Filter out any null values from the result due to missing cart or user
    const validOrders = allOrders.filter(order => order !== null);

    // Return the valid orders
    res.status(200).json({
      status: 'success',
      data: validOrders
    });
  } catch (error) {
    // Handle any errors
    next(error);
  }
});
exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id, status } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  console.log(status);

  if (
    status !== 'delivered' &&
    status !== 'shipped' &&
    status !== 'processing' &&
    status !== 'pending'
  ) {
    return next(new AppError('Invalid order status', 400));
  }

  const newOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: status
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: newOrder
  });
});
