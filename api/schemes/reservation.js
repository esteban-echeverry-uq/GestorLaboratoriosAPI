const mongoose = require('mongoose');
const reservationTypes = require('../configs/constants/reservationTypes');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},
	date: {
		required: 'Each reservation needs a date.',
		type: Date
	},
	elementID: {
		required: 'Each reservation needs a room or tool.',
		type: String
	},
	elementType: {
		default: 'room',
		enum: Object.values(reservationTypes),
		required: 'Each needs to define what is reserved.',
		type: String
	},
	endTime: {
		required: 'The reservation needs an ending time.',
		type: Number
	},
	startTime: {
		required: 'The reservation needs a starting time.',
		type: Number
	},
	userID: {
		required: 'Each reservation needs a user.',
		type: String
	},
});

module.exports = ReservationSchema;
