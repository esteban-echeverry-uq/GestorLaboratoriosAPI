const toolController = require('../controllers/tool');
const multer = require('multer');
const upload = multer();

module.exports = function(app) {
	app.route('/api/spaces/:spaceID/tools')
		.get(toolController.getAll)
		.post(toolController.create);

	app.route('/api/tools/:toolID')
		.get(toolController.getByID)
		.put(toolController.update)
		.delete(toolController.destroy);

	app.route('/api/tools/:toolID/manual')
		.post(upload.array(), toolController.addManual)
		.delete(toolController.removeManual);
};
