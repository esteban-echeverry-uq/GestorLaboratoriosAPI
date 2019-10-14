const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { controllerErrors } = require('../helpers/user');
const User = mongoose.model('Users');

const controller = {
	async getAll(req, res) {
		const {	ERROR_GETTING_USERS } = controllerErrors;

		try {
			const users = await User.find();
			res.send({ users, status: 'success' });
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
			const user = await User.findById(req.params.id);

			if (!user) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ user, status: 'success' });
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
			const user = new User(req.body);
			await user.save();
			res.send({ user, status: 'success' });
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
			const user = await User.updateOne(req.body);

			if (!user) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			res.send({ user, status: 'success' });
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
			const user = await User.findById(req.params.id);

			if (!user) return res.send({
				message: ERROR_GETTING_USER.MESSAGES.USER_NOT_FOUND,
				type: ERROR_GETTING_USER.TYPE,
				status: 'error'
			});

			await user.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_DELETING_USER.TYPE,
				status: 'error'
			});
		}
	},
	async login(req, res) {
		const { ERROR_WHILE_LOGIN } = controllerErrors;

		try {
			const user = await User.findOne({ email: req.body.email });

			if (!user) return res.send({
				message: ERROR_WHILE_LOGIN.MESSAGES.INVALID_LOGIN_INFO,
				type: ERROR_WHILE_LOGIN.TYPE,
				status: 'error'
			});

			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

			if (!passwordIsValid) return res.send({
				message: ERROR_WHILE_LOGIN.MESSAGES.INVALID_LOGIN_INFO,
				type: ERROR_WHILE_LOGIN.TYPE,
				status: 'error'
			});


			const token = jwt.sign({ id: user._id }, 'secret-key', {
				expiresIn: 86400
			});

			res.send({ user, token, status: 'success' });

		} catch (e) {
			res.send({
				message: e.message,
				type: ERROR_WHILE_LOGIN.TYPE,
				status: 'error'
			});
		}
	},
	logout(req, res) {
		res.send({ type: 'logout', status: 'success' });
	},
	async register(req, res) {
		const { ERROR_CREATING_USER } = controllerErrors;

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
				type: ERROR_CREATING_USER.TYPE,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
