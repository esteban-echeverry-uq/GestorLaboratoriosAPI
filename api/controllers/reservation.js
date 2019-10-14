module.exports = {
	login: function(req, res) {
		res.send({ message: 'login', status: 'success' });
	},
	logout: function(req, res) {
		res.send({ message: 'logout', status: 'success' });
	},
	register: function(req, res) {
		res.send({ message: 'register', status: 'success' });
	}
};
