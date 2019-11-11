const spaceController = require('../controllers/space');

module.exports = function(app) {
	app.route('/api/spaces')
		.get(spaceController.getAll)
		.post(spaceController.create);

	app.route('/api/spaces/:spaceID')
		.get(spaceController.getByID)
		.put(spaceController.update)
		.delete(spaceController.destroy);
};
