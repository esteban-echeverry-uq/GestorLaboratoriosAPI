const mongoose = require('mongoose');
const QRCode = require('qrcode');
const S3Service = require('../services/s3Service');
const Room = mongoose.model('Rooms');
const { generalErrors, cleanDBError } = require('../helpers/errors');

const s3Service = new S3Service('room');

const controller = {
	async getAll(req, res) {
		try {
			const rooms = await Room.find({ spaceID: req.params.spaceID });
			res.send({ rooms, status: 'success' });
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
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			res.send({ room, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async create(req, res) {
		try {
			const room = new Room(req.body);
			const QR = await QRCode.toDataURL(room._id+'');
			const amazonResponse = await s3Service.uploadImage(QR, room._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
				status: 'error'
			});

			room.qr = amazonResponse.imageURL;
			await room.save();
			res.send({ room, status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async update(req, res) {
		const { GETTING_ENTITY } = generalErrors;

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
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	},
	async destroy(req, res) {
		const { GETTING_ENTITY } = generalErrors;

		try {
			const room = await Room.findById(req.params.id);

			if (!room) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			const amazonResponse = await s3Service.deleteImage(room._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
				status: 'error'
			});

			await room.remove();
			res.send({ status: 'success' });
		} catch (e) {
			res.send({
				message: cleanDBError(e.message) || e.message,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
