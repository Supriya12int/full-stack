const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    technician: {
      type: String,
      default: 'Assigned Soon',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    bookingDetails: {
      name: String,
      phone: String,
      email: String,
      address: String,
      description: String,
      serviceType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
