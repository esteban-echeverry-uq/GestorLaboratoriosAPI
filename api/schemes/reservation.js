const mongoose = require('mongoose');
const reservationStatuses = require('../configs/constants/reservationStatuses');
const reservationTypes = require('../configs/constants/reservationTypes');
const {
	schemaErrors: {
		reservations: {
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
	element: {
		required: ELEMENT_ID,
		type: Schema.Types.ObjectId,
		refPath: 'elementType'
	},
	elementType: {
		default: reservationTypes.ROOM,
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
	status: {
		default: reservationStatuses.PENDING,
		enum: Object.values(reservationStatuses),
		type: String
	}
});

module.exports = ReservationSchema;
