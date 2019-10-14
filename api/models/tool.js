const ToolSchema = require('../schemes/tool');
const mongoose = require('mongoose');

module.exports = mongoose.model('Tools', ToolSchema);
