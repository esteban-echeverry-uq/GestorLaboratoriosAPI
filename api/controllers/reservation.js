const mongoose = require('mongoose');
const { controllerErrors } = require('../helpers/user');
const Reservation = mongoose.model('Reservations');
const Room = mongoose.model('Rooms');
const Tool = mongoose.model('Tools');
const reservationTypes = require('../configs/constants/reservationTypes');

const controller = {
	async getAll(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const query = {};

			if (req.query.userID) query['userID'] = req.query.userID;
			if (req.query.elementID) query['elementID'] = req.query.elementID;

			const reservations = await Reservation.find(query);
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_GETTING_USERS.TYPE,
				status: 'error'
			});
		}
	},
	async getAllByElement(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const reservations = await Reservation.find({ elementID: req.params.elementID });
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_GETTING_USERS.TYPE,
				status: 'error'
			});
		}
	},
	async getAllByUser(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const reservations = await Reservation.find({ userID: req.params.userID });
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_GETTING_USERS.TYPE,
				status: 'error'
			});
		}
	},
	async getByID(req, res) {
		const {	ERROR_GETTING_USER } = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		const {
			ERROR_CREATING_USER,
			ERROR_GETTING_USER
		} = controllerErrors;

		try {
			const reservation = new Reservation(req.body);
			const ElementModel = reservation.type == reservationTypes.ROOM ? Room : Tool;

			const element = ElementModel.findById(req.params.elementID);

			if (!element) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			const elementReservations = Reservation.find({
				date: { "$gte": Date.now() },
				elementID: element._id,
				timeBegin: {
					"$gte": reservation.startTime,
					"$lt": reservation.endTime
				}
			});

			if (!elementReservations.length) return res.send({
				message: ERROR_CREATING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_CREATING_USER.TYPE,
				status: 'error'
			});

			await reservation.save();
			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_CREATING_USER.TYPE,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const {
			ERROR_GETTING_USER,
			ERROR_UPDATING_USER
		} = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await Reservation.update({_id: reservation._id }, req.body);

			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_UPDATING_USER.TYPE,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const {
			ERROR_GETTING_USER,
			ERROR_DELETING_USER
		} = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await reservation.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_DELETING_USER.TYPE,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
