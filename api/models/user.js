const UserSchema = require('../schemes/user');
const mongoose = require('mongoose');

module.exports = mongoose.model('Users', UserSchema);
