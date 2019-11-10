const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservations');
const reservationStatuses = require('../configs/constants/reservationStatuses');

module.exports = (async function () {
	const today = new Date();
	const currentHour = today.getHours();

	try {
		await Reservation.updateMany(
			{
				status: reservationStatuses.CONFIRMED,
				endTime: currentHour
			},
			{ "$set":{ status: reservationStatuses.FINISHED } }
		);

		console.log('canceled all pending reservations');
	} catch (e) {
		console.log(e.message);
	}
})();
