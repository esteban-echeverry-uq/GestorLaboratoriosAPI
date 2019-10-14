const ReservationSchema = require('../schemes/room');
const mongoose = require('mongoose');

module.exports = mongoose.model('Reservations', ReservationSchema);
