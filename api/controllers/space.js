const mongoose = require('mongoose');
const { controllerErrors } = require('../helpers/user');
const Space = mongoose.model('Spaces');

const controller = {
	async getAll(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const spaces = await Space.find();
			res.send({ spaces, status: 'success' });
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
			const space = await Space.findById(req.params.id);

			if (!space) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ space, status: 'success' });
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
			const space = new Space(req.body);
			await space.save();
			res.send({ space, status: 'success' });
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
			const space = await Space.updateOne(req.body);

			if (!space) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ space, status: 'success' });
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
			const space = await Space.findById(req.params.id);

			if (!space) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await space.remove();
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
