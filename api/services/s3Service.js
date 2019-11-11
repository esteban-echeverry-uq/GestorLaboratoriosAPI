const AWS = require('aws-sdk');

// Configure AWS with your access and secret key.
const {
	AMAZON_PUBLIC_KEY,
	AMAZON_SECRET_KEY,
	BUCKET_NAME
} = require('../configs/config');

// Configure AWS to use promise
AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({ accessKeyId: AMAZON_PUBLIC_KEY, secretAccessKey: AMAZON_SECRET_KEY });

// Create an s3 instance
const s3 = new AWS.S3();

module.exports = class S3Service {
	itemType = '';

	constructor(itemType) {
		this.itemType = itemType;
	}

	async uploadImage(base64, itemID) {
		const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		// Getting the file type, ie: jpeg, png or gif
		const type = base64.split(';')[0].split('/')[1];

		let location = '';

		const params = {
			Bucket: BUCKET_NAME,
			Key: `${this.itemType}-${itemID}.png`, // type is not required
			Body: base64Data,
			ACL: 'public-read',
			ContentEncoding: 'base64', // required
			ContentType: `image/${type}` // required. Notice the back ticks
		};

		try {
			const {Location} = await s3.upload(params).promise();
			location = Location;
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			};
		}

		return {
			status: 'success',
			imageURL: location
		};
	}

	async deleteImage(itemID) {
		const params = {
			Bucket: BUCKET_NAME,
			Key: `${this.itemType}-${itemID}.png`
		};

		try {
			await s3.deleteObject(params).promise();
			return { status: 'success' };
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			};
		}
	}
};
