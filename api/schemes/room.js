const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
	schemaErrors: {
		rooms: {
			NAME,
			QR,
			SPACE_ID
		}
	}
} = require('../helpers/errors');

const RoomSchema = new Schema({
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
	spaceID: {
		required: SPACE_ID,
		type: String
	}
});

module.exports = RoomSchema;
