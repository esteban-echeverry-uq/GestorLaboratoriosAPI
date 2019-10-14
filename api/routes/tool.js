const toolController = require('../controllers/tool');

module.exports = function(app) {
	app.route('/api/spaces/:spaceID/tools')
		.get(toolController.getAll)
		.post(toolController.create);

	app.route('/api/spaces/:spaceID/tools/:id')
		.get(toolController.getByID)
		.put(toolController.update)
		.delete(toolController.destroy);
};
