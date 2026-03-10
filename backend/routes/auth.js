const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, email, phone, address, password } = req.body;

      // Validate phone number (at least 10 digits)
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        return res.status(400).json({ message: 'Phone number must be at least 10 digits' });
      }

      // Check if user already exists by email
      let userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Check if phone already exists
      userExists = await User.findOne({ phone });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this phone number' });
      }

      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Create new user in MongoDB
      const newUser = new User({
        firstName,
        lastName: lastName || '',
        email,
        phone,
        address: address || null,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
        },
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error during signup' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user in MongoDB
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

module.exports = router;
