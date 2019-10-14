const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpaceSchema = new Schema({
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
	}
});

module.exports = SpaceSchema;
