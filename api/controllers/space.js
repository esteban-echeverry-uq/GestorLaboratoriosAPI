const mongoose = require('mongoose');
const Space = mongoose.model('Spaces');
const databaseEntities = require('../configs/constants/databaseEntities');
const errorsHelper = require('../helpers/errors');

const controllerErrors = errorsHelper(databaseEntities.SPACE);

const controller = {
	async getAll(req, res) {
		try {
			const spaces = await Space.find();
			res.send({ spaces, status: 'success' });
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
			const space = await Space.findById(req.params.id);

			if (!space) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ space, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		try {
			const space = new Space(req.body);
			await space.save();
			res.send({ space, status: 'success' });
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
			const space = await Space.findById(req.params.id);

			if (!space) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await Space.update({_id: space._id }, req.body);

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
			const space = await Space.findById(req.params.id);

			if (!space) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await space.remove();
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
