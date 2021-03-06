const reservationController = require('../controllers/reservation');

module.exports = function(app) {
	app.route('/api/admin/reservations')
		.get(reservationController.getAll);

	app.route('/api/users/:userID/reservations')
		.get(reservationController.getAllByUser);

	app.route('/api/elements/:elementID/reservations')
		.get(reservationController.getAllByElement)
		.post(reservationController.create);

	app.route('/api/reservations/:reservationID')
		.get(reservationController.getByID)
		.put(reservationController.update)
		.delete(reservationController.destroy);

	app.route('/api/reservations/:reservationID/confirm')
		.post(reservationController.confirm);
};
