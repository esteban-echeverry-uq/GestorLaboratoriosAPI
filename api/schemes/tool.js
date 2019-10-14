const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},

	description: {
		type: String
	},
	name: {
		required: 'Please add the name.',
		type: String
	},
	qr: {
		required: 'Each tool needs a QR code.',
		type: String
	},
	spaceID: {
		required: 'Each room needs a space to which belongs.',
		type: String
	}
});

module.exports = ToolSchema;