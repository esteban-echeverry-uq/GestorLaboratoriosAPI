const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const databaseEntitites = require('../configs/constants/databaseEntities');
const { generalErrors } = require('../helpers/errors');

const controller = {
	async getAll(req, res) {
		try {
			const users = await User.find();
			res.send({ users, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async getByID(req, res) {
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const user = await User.findById(req.params.id);

			if (!user) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ user, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		try {
			const user = new User(req.body);
			await user.save();
			res.send({ user, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const { GETTING_ENTITY } = generalErrors;

		try {
			const user = await User.findById(req.params.id);

			if (!user) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await User.update({_id: user._id }, req.body);

			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const user = await User.findById(req.params.id);

			if (!user) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			await user.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async login(req, res) {
		const {	WHILE_LOGIN } = generalErrors;

		try {
			const user = await User.findOne({ email: req.body.email });

			if (!user) return res.send({
				message: WHILE_LOGIN,
				status: 'error'
			});

			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

			if (!passwordIsValid) return res.send({
				message: WHILE_LOGIN,
				status: 'error'
			});


			const token = jwt.sign({ id: user._id }, 'secret-key', {
				expiresIn: 86400
			});

			res.send({ user, token, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	logout(req, res) {
		res.send({ type: 'logout', status: 'success' });
	},
	async register(req, res) {
		try {
			const user = new User(req.body);
			await user.save();

			const token = jwt.sign({ id: user._id }, 'secret-key', {
				expiresIn: 86400
			});

			res.send({ user, token, status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
