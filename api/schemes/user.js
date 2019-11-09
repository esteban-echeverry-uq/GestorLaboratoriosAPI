const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userRoles = require('../configs/constants/userRoles');
const Schema = mongoose.Schema;
const {
	schemaErrors: {
		users: {
			EMAIL,
			NAME,
			PASSWORD
		}
	}
} = require('../helpers/errors');

const UserSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},
	email: {
		required: EMAIL,
		type: String,
		unique: true
	},
	name: {
		required: NAME,
		type: String
	},
	password: {
		required: PASSWORD,
		type: String
	},
	role: {
		default: 'student',
		enum: Object.values(userRoles),
		type: String
	},
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, 8);
	next();
});

module.exports = UserSchema;
