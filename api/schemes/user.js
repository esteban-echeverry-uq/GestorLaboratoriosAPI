const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},
	email: {
		required: 'Please add the email.',
		type: String,
		unique: true
	},
	name: {
		required: 'Please add the name.',
		type: String
	},
	password: {
		required: 'Please add the password.',
		type: String
	},
	role: {
		default: 'student',
		enum: ['admin', 'student', 'teacher'],
		required: 'The user needs a role.',
		type: String
	},
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, 8);
	next();
});

module.exports = UserSchema;
