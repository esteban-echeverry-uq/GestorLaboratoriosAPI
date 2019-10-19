const mongoose = require('mongoose');
const Tool = mongoose.model('Tools');
const databaseEntities = require('../configs/constants/databaseEntities');
const errorsHelper = require('../helpers/errors');

const controllerErrors = errorsHelper(databaseEntities.TOOL);

const controller = {
	async getAll(req, res) {
		try {
			const tools = await Tool.find({ spaceID: req.params.spaceID });
			res.send({ tools, status: 'success' });
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
			const tool = await Tool.findById(req.params.id);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ tool, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		try {
			const tool = new Tool(req.body);
			await tool.save();
			res.send({ tool, status: 'success' });
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
			const tool = await Tool.findById(req.params.id);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await Tool.update({_id: tool._id }, req.body);

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
			const tool = await Tool.findById(req.params.id);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await tool.remove();
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
