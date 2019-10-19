const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservations');
const Room = mongoose.model('Rooms');
const Tool = mongoose.model('Tools');
const reservationTypes = require('../configs/constants/reservationTypes');
const databaseEntitites = require('../configs/constants/databaseEntities');
const errorsHelper = require('../helpers/errors');

const controllerErrors = errorsHelper(databaseEntitites.RESERVATION);

const controller = {
	async getAll(req, res) {
		try {
			const query = {};

			if (req.query.userID) query['userID'] = req.query.userID;
			if (req.query.elementID) query['elementID'] = req.query.elementID;

			const reservations = await Reservation.find(query);
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async getAllByElement(req, res) {
		try {
			const reservations = await Reservation.find({ elementID: req.params.elementID });
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async getAllByUser(req, res) {
		try {
			const reservations = await Reservation.find({ userID: req.params.userID });
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async getByID(req, res) {
		const {	GETTING_ENTITY } = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		const {
			GETTING_ENTITY,
			TIME_ALREADY_RESERVED
		} = controllerErrors;

		try {
			const reservation = new Reservation(req.body);
			const ElementModel = reservation.type == reservationTypes.ROOM ? Room : Tool;

			const element = ElementModel.findById(req.params.elementID);

			if (!element) return res.send({
				message: GETTING_ENTITY,
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
				message: TIME_ALREADY_RESERVED,
				status: 'error'
			});

			await reservation.save();
			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const {	GETTING_ENTITY } = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await Reservation.update({_id: reservation._id }, req.body);

			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const {	GETTING_ENTITY } = controllerErrors;

		try {
			const reservation = await Reservation.findById(req.params.id);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await reservation.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
