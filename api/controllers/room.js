const mongoose = require('mongoose');
const { controllerErrors } = require('../helpers/user');
const Room = mongoose.model('Rooms');

const controller = {
	async getAll(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const rooms = await Room.find();
			res.send({ rooms, status: 'success' });
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
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ room, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		const { ERROR_CREATING_USER } = controllerErrors;

		try {
			const room = new Room(req.body);
			await room.save();
			res.send({ room, status: 'success' });
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
			const room = await Room.updateOne(req.body);

			if (!room) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ room, status: 'success' });
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
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await room.remove();
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
