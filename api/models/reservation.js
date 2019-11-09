const ReservationSchema = require('../schemes/reservation');
const mongoose = require('mongoose');

module.exports = mongoose.model('Reservations', ReservationSchema);
