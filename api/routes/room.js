const roomController = require('../controllers/room');

module.exports = function(app) {
	app.route('/api/spaces/:spaceID/rooms')
		.get(roomController.getAll)
		.post(roomController.create);

	app.route('/api/spaces/:spaceID/rooms/:id')
		.get(roomController.getByID)
		.put(roomController.update)
		.delete(roomController.destroy);
};
