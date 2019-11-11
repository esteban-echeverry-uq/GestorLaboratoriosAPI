require('../../models/space');

const mongoose = require('mongoose');
const SpaceController = require('../../controllers/space');

let response, spaceID;

const space = {
	name: 'Facultad de Ingenieria'
};

const res = {
	send: (data) => {
		response = data;

		if (data.space) spaceID = data.space._id;
	}
};

describe('Space Controller Test', () => {
	beforeAll(async () => {
		response = {};
		await mongoose.connect('mongodb://localhost/laboratoryManagementTest', {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});

	it('Creates a space', async () => {
		await SpaceController.create({ body: space }, res);

		console.log(response);


		expect(response.status).toBe('success');
		expect(response.space.name).toBe(space.name);
	});

	it('Gets all the spaces', async () => {
		await SpaceController.getAll({}, res);

		expect(response.status).toBe('success');
	});

	it('Gets a space', async () => {
		await SpaceController.getByID({ params: { spaceID } }, res);

		expect(response.status).toBe('success');
	});
});
