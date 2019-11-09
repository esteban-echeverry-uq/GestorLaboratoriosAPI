const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
	schemaErrors: {
		spaces: {
			NAME
		}
	}
} = require('../helpers/errors');

const SpaceSchema = new Schema({
	created_date: {
		default: Date.now,
		type: Date
	},
	description: {
		type: String
	},
	name: {
		required: NAME,
		type: String
	},
	coordinate: {
		type: {
			longitude: {
				type: String
			},
			latitude: {
				type: String
			}

		}
	}
});

module.exports = SpaceSchema;
