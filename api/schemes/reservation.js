const mongoose = require('mongoose');
const reservationTypes = require('../configs/constants/reservationTypes');
const {
	schemaErrors: {
		reservations: {
			DATE,
			ELEMENT_ID,
			END_TIME,
			START_TIME,
			USER_ID
		}
	}
} = require('../helpers/errors');

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},
	date: {
		required: DATE,
		type: Date
	},
	elementID: {
		required: ELEMENT_ID,
		type: String
	},
	elementType: {
		default: 'room',
		enum: Object.values(reservationTypes),
		type: String
	},
	endTime: {
		required: END_TIME,
		type: Number
	},
	startTime: {
		required: START_TIME,
		type: Number
	},
	userID: {
		required: USER_ID,
		type: String
	},
});

module.exports = ReservationSchema;
