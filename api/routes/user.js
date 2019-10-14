const userController = require('../controllers/user');

module.exports = function(app) {
	app.route('/api/users')
		.get(userController.getAll)
		.post(userController.create);

	app.route('/api/users/:id')
		.get(userController.getByID)
		.put(userController.update)
		.delete(userController.destroy);

	app.route('/api/login')
		.post(userController.login);

	app.route('/api/logout')
		.post(userController.logout);

	app.route('/api/register')
		.post(userController.register);
};
