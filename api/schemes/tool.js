const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
	schemaErrors: {
		tools: {
			NAME,
			QR,
			SPACE_ID
		}
	}
} = require('../helpers/errors');

const ToolSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},

	description: {
		type: String
	},
	name: {
		required: NAME,
		type: String
	},
	qr: {
		required: QR,
		type: String
	},
	manual: {
		type: String
	},
	spaceID: {
		required: SPACE_ID,
		type: String
	}
});

module.exports = ToolSchema;
