const RoomsSchema = require('../schemes/room');
const mongoose = require('mongoose');

module.exports = mongoose.model('Rooms', RoomsSchema);
