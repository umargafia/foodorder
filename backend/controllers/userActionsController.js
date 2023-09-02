const Address = require('../models/addressModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Card = require('../models/CardModel');

// Function to add a new address for a user
exports.addAddress = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'This route is no longer in use pls use update address route'
  });
});

// Function to update an existing address
exports.updateAddress = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { addressId, country, state, localGov, zipCode, street } = req.body;

  // Check if the address exists in the database
  let address = await Address.findOne({ user: userId });

  if (!address) {
    // Create a new address if it doesn't exist
    address = await Address.create({
      user: userId,
      country,
      state,
      localGov,
      zipCode,
      street
    });
  } else {
    // Update the existing address
    address = await Address.findOneAndUpdate(
      { _id: address._id, user: userId },
      { country, state, localGov, zipCode, street },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    status: 'success',
    data: address
  });
});

exports.getUserAddresses = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const userAddresses = await Address.find({ user: userId });

  res.status(200).json({
    status: 'success',
    data: userAddresses
  });
});

// Function to delete an address
exports.deleteAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.body;
  const userId = req.user._id;

  // Find the address in the database and delete it
  const deletedAddress = await Address.findOneAndDelete({
    _id: addressId,
    user: userId
  });

  if (!deletedAddress) {
    return next(new AppError('Address not found or unauthorized', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createCard = catchAsync(async (req, res, next) => {
  //get user and body
  const user = req.user;
  const { cardHolder, cardNumber, cvv, expiration } = req.body;

  //verify if the body is valid
  if (!cardHolder || !cardNumber || !cvv || !expiration) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  // check if user have a card
  const card = await Card.findOne({ user });

  //if user have a card update the card
  if (card) {
    card.cardHolder = cardHolder;
    card.cardNumber = cardNumber;
    card.cvv = cvv;

    // save the card
    await card.save();

    // return the card
    return res.status(200).json({
      status: 'success',
      data: {
        id: card._id,
        user: card.user,
        cardHolder: card.cardHolder,
        cardNumber: card.cardNumber,
        expiration: card.expiration,
        cvv: card.cvv
      }
    });
  }

  // if user dosn't have a card create a new card
  if (!card) {
    // save the card
    const newCard = await Card.create({
      user,
      cardHolder,
      cardNumber,
      cvv,
      expiration
    });

    // return the card
    return res.status(201).json({
      status: 'success',
      data: {
        id: newCard._id,
        user: newCard.user._id,
        cardHolder: newCard.cardHolder,
        cardNumber: newCard.cardNumber,
        expiration: newCard.expiration,
        cvv: newCard.cvv
      }
    });
  }
});

exports.getCard = catchAsync(async (req, res, next) => {
  // get the user
  const user = req.user;
  //check if the user have a card
  const card = await Card.findOne({ user });

  // if user have a card return the card
  if (card) {
    return res.status(200).json({
      status: 'success',
      data: {
        id: card._id,
        user: card.user,
        cardHolder: card.cardHolder,
        cardNumber: card.cardNumber,
        expiration: card.expiration,
        cvv: card.cvv
      }
    });
  }

  // if user dosn't have a card return an empty body
  return res.status(200).json({
    status: 'success',
    message: 'user does not have a card'
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  //get the card id
  const cardId = req.params.id;
  // check if the card exists and delete it
  const card = await Card.findByIdAndDelete({ _id: cardId });
  // if the card does not exists  return an error
  if (!card) {
    return next(new AppError('Card not found', 404));
  }
  res.status(200).json({ message: 'Card deleted successfully' });
});
