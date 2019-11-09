module.exports = function(app) {
	// Home Routes
	app.route('/api').get(async function(req, res) {
		return res.send({ name: 'API WORKING' });
	});
};
