const spaceController = require('../controllers/space');

module.exports = function(app) {
	app.route('/api/spaces')
		.get(spaceController.getAll)
		.post(spaceController.create);

	app.route('/api/spaces/:id')
		.get(spaceController.getByID)
		.put(spaceController.update)
		.delete(spaceController.destroy);
};
