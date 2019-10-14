module.exports = function(app) {
	// Home Routes
	app.route('/api')
		.get(function(req, res) {
			res.json({
				name: 'API WORKING'
			});
		});
};
