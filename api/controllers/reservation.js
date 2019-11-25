const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservations');
const Room = mongoose.model('Rooms');
const Tool = mongoose.model('Tools');
const reservationTypes = require('../configs/constants/reservationTypes');
const reservationStatuses = require('../configs/constants/reservationStatuses');
const { generalErrors, cleanDBError } = require('../helpers/errors');

const controller = {
	async getAll(req, res) {
		try {
			const query = {};

			if (req.query.userID) query['userID'] = req.query.userID;
			if (req.query.elementID) query['element'] = req.query.elementID;

			const reservations = await Reservation.find(query);
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async getAllByElement(req, res) {
		let date = {};

		if (req.query.date) {
			const reservationDate = new Date(req.query.date);
			const minDate = new Date(
				reservationDate.getFullYear(),
				reservationDate.getMonth(),
				reservationDate.getDate(),
				0,
				0,
				0
			);
			const maxDate = new Date(
				reservationDate.getFullYear(),
				reservationDate.getMonth(),
				reservationDate.getDate(),
				23,
				59,
				59
			);

			date = {
				"$gte": minDate,
				"$lt": maxDate
			};
		}

		try {
			const reservations = await Reservation.find({
				element: req.params.elementID,
				status: {$in: [ reservationStatuses.PENDING, reservationStatuses.CONFIRMED ]},
				date
			});
			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async getAllByUser(req, res) {
		try {
			const reservations = await Reservation.find({ userID: req.params.userID }).populate('element');

			res.send({ reservations, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async getByID(req, res) {
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const reservation = await Reservation.findById(req.params.reservationID);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		const {
			GETTING_ENTITY,
			TIME_ALREADY_RESERVED
		} = generalErrors;

		try {
			const reservation = new Reservation(req.body);
			const ElementModel = reservation.type == reservationTypes.ROOM ? Room : Tool;
			const element = ElementModel.findById(req.params.elementID);

			if (!element) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			const minDate = new Date(
				reservation.date.getFullYear(),
				reservation.date.getMonth(),
				reservation.date.getDate(),
				0,
				0,
				0
			);

			const maxDate = new Date(
				reservation.date.getFullYear(),
				reservation.date.getMonth(),
				reservation.date.getDate(),
				23,
				59,
				59
			);

			const elementReservations = Reservation.find({
				element: element._id,
				startTime: {
					"$gte": reservation.startTime,
					"$lt": reservation.endTime
				},
				date: {
					"$gte": minDate,
					"$lt": maxDate
				}
			});

			if (elementReservations.length) return res.send({
				message: TIME_ALREADY_RESERVED,
				status: 'error'
			});

			await reservation.save();
			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const reservation = await Reservation.findById(req.params.reservationID);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await Reservation.update({_id: reservation._id }, req.body);

			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const reservation = await Reservation.findById(req.params.reservationID);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await reservation.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async confirm(req, res) {
		const {
			GETTING_ENTITY,
			NOT_READY_TO_CONFIRM,
			RESERVATION_NOT_PENDING,
			TIME_ALREADY_EXPIRED
		} = generalErrors;

		try {
			const reservation = await Reservation.findById(req.params.reservationID);

			if (!reservation) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			if (reservation.status !== reservationStatuses.PENDING) return res.send({
				message: RESERVATION_NOT_PENDING,
				status: 'error'
			});

			const today = new Date();
			const minDate = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				0,
				0,
				0
			);
			const maxDate = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				23,
				59,
				59
			);

			console.log('first validation');

			console.log(reservation.date);
			console.log(minDate);
			console.log(maxDate);

			if (reservation.date < minDate) {
				reservation.status = reservationStatuses.FINISHED;
				await reservation.save();

				return res.send({
					message: TIME_ALREADY_EXPIRED,
					status: 'error'
				});
			}

			if (reservation.date > maxDate) return res.send({
				message: NOT_READY_TO_CONFIRM,
				status: 'error'
			});

			const currentTime = today.getHours() + today.getMinutes() / 60;
			const minTime = reservation.startTime - 0.25;
			const maxTime = reservation.startTime + 0.25;

			console.log('pass first validation');

			if (currentTime > maxTime) {
				reservation.status = reservationStatuses.FINISHED;
				await reservation.save();

				return res.send({
					message: TIME_ALREADY_EXPIRED,
					status: 'error'
				});
			}

			if (currentTime < minTime) return res.send({
				message: NOT_READY_TO_CONFIRM,
				status: 'error'
			});

			reservation.status = reservationStatuses.CONFIRMED;
			await reservation.save();
			res.send({ reservation, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
