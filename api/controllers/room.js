const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');
const databaseEntitites = require('../configs/constants/databaseEntities');
const errorsHelper = require('../helpers/errors');

const controllerErrors = errorsHelper(databaseEntitites.ROOM);

const controller = {
	async getAll(req, res) {
		try {
			const rooms = await Room.find({ spaceID: req.params.spaceID });
			res.send({ rooms, status: 'success' });
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
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ room, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		try {
			const room = new Room(req.body);
			await room.save();
			res.send({ room, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const { GETTING_ENTITY } = controllerErrors;

		try {
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await Room.update({_id: room._id }, req.body);

			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const { GETTING_ENTITY } = controllerErrors;

		try {
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await room.remove();
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
