const SpaceSchema = require('../schemes/space');
const mongoose = require('mongoose');

module.exports = mongoose.model('Spaces', SpaceSchema);
