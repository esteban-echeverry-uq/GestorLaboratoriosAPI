const mongoose = require('mongoose');
const { controllerErrors } = require('../helpers/user');
const Tool = mongoose.model('Tools');

const controller = {
	async getAll(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const tools = await Tool.find();
			res.send({ tools, status: 'success' });
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
			const tool = await Tool.findById(req.params.id);

			if (!tool) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ tool, status: 'success' });
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
			const tool = new Tool(req.body);
			await tool.save();
			res.send({ tool, status: 'success' });
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
			const tool = await Tool.updateOne(req.body);

			if (!tool) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ tool, status: 'success' });
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
			const tool = await Tool.findById(req.params.id);

			if (!tool) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await tool.remove();
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
