const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const router = express.Router();

// Middleware to verify user (simple check)
const verifyUser = (req, res, next) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'User ID required' });
  }
  req.userId = userId;
  next();
};

// Create a new booking
router.post('/create', verifyUser, async (req, res) => {
  try {
    const { service, serviceId, date, time, bookingDetails } = req.body;

    console.log('Create booking request:', {
      userId: req.userId,
      service,
      date,
      time,
      bookingDetails
    });

    if (!service || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields: service, date, time' });
    }

    // Validate userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      console.error('Invalid userId format:', req.userId);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const newBooking = new Booking({
      userId: new mongoose.Types.ObjectId(req.userId),
      service,
      serviceId,
      date: new Date(date),
      time,
      bookingDetails,
    });

    const savedBooking = await newBooking.save();
    console.log('Booking created successfully:', savedBooking);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: savedBooking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings for a user
router.get('/my-bookings', verifyUser, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const bookings = await Booking.find({ userId: new mongoose.Types.ObjectId(req.userId) }).sort({ createdAt: -1 });
    res.json({
      message: 'Bookings retrieved successfully',
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Update booking status
router.put('/update/:bookingId', verifyUser, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    const booking = await Booking.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.bookingId),
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
});

// Delete a booking
router.delete('/delete/:bookingId', verifyUser, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    const booking = await Booking.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.bookingId));

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

module.exports = router;
