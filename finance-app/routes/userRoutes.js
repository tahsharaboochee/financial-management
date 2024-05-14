const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Middleware to handle async routes
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
           .catch(next);
  };

// Controller functions
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registering: ", email); // Log the email being registered
  try {
    const user = new User({ username, email: email.toLowerCase(), password });
    await user.save();
    const token = generateToken(user._id.toString());
    user.tokens = user.tokens.concat({ token });
    await user.save();
    console.log("User registered with hashed password: ", user.password); // Log the hashed password
    res.status(201).send({ user, token });
  } catch (error) {
    console.error("Error during registration: ", error); // Log any errors
    res.status(400).send({ error: 'Failed to register user. Make sure the email is unique and valid.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt: ", email); // Log the login attempt
  console.log("Received password:", password);  // Log the password being attempted
  try {
    const user = await User.findOne({ email: email.toLowerCase() }); // Ensure email is case-insensitive
    if (!user) {
      console.log("User not found for email: ", email); // Log if no user is found
      return res.status(404).send({ error: 'User not found.' });
    }
    console.log("Stored hashed password from DB:", user.password); // Log the stored hashed password

    const isMatch = await user.comparePassword(password); // Use the comparePassword method
    console.log("Comparing entered password with hashed password: ", password, user.password, isMatch); // Log the comparison result

    if (!isMatch) {
      console.log("Password mismatch"); // Log if the password does not match
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login: ", error); // Log any server errors
    res.status(500).send({ error: 'Server error during login.' });
  }
};

// Route definitions
router.post('/users/register', asyncMiddleware(registerUser));
router.post('/users/login', asyncMiddleware(loginUser));

module.exports = router;
