const mongoose = require('mongoose');
const Tool = mongoose.model('Tools');
const QRCode = require('qrcode');
const S3Service = require('../services/s3Service');
const { generalErrors } = require('../helpers/errors');

const s3Service = new S3Service('tool');

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
		const {	GETTING_ENTITY } = generalErrors;

		try {
			const tool = await Tool.findById(req.params.toolID);

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
			const QR = await QRCode.toDataURL(tool._id+'');
			const amazonResponse = await s3Service.uploadImage(QR, tool._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
				status: 'error'
			});

			tool.qr = amazonResponse.imageURL;
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
		const { GETTING_ENTITY } = generalErrors;

		try {
			const tool = await Tool.findById(req.params.toolID);

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
		const { GETTING_ENTITY } = generalErrors;

		try {
			const tool = await Tool.findById(req.params.toolID);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			const amazonResponse = await s3Service.deleteImage(tool._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
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
	},
	async addManual(req, res) {
		const {GETTING_ENTITY} = generalErrors;

		try {
			const tool = await Tool.findById(req.params.toolID);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			const file = req.files[0];

			const amazonResponse = await s3Service.uploadManual(file, tool._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
				status: 'error'
			});

			tool.manual = amazonResponse.manualURL;
			await tool.save();
			res.send({tool, status: 'success'});
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	},
	async removeManual(req, res) {
		const {GETTING_ENTITY} = generalErrors;

		try {
			const tool = await Tool.findById(req.params.toolID);

			if (!tool) return res.send({
				message: GETTING_ENTITY,
				status: 'error'
			});

			const amazonResponse = await s3Service.deleteManual(tool._id);

			if (amazonResponse.status === 'error') return res.send({
				message: amazonResponse.message,
				status: 'error'
			});

			tool.manual = null;
			await tool.save();
			res.send({status: 'success'});
		} catch (e) {
			res.send({
				message: e.message,
				status: 'error'
			});
		}
	}
};

module.exports = controller;
