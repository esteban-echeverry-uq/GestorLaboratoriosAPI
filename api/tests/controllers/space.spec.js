require('../../models/space');

const mongoose = require('mongoose');
const Space = mongoose.model('Spaces');
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

		await Space.remove({});
	});

	it('Creates a space', async () => {
		await SpaceController.create({ body: space }, res);

		expect(response.status).toBe('success');
		expect(response.space.name).toBe(space.name);
	});

	it('Gets all the spaces', async () => {
		await SpaceController.getAll({}, res);

		expect(response.status).toBe('success');
		expect(response.spaces.length).toBe(1);
		expect(response.spaces[0].name).toBe(space.name);
	});

	it('Gets a space', async () => {
		await SpaceController.getByID({ params: { spaceID } }, res);

		expect(response.status).toBe('success');
		expect(response.space.name).toBe(space.name);
	});

	it('Edits a space', async () => {
		const newName = 'Facultad de Ciencias Basicas';
		await SpaceController.update({ params: { spaceID }, body: { name: newName }  }, res);
		await SpaceController.getByID({ params: { spaceID } }, res);

		expect(response.status).toBe('success');
		expect(response.space.name).toBe(newName);
	});

	it('Deletes a space', async () => {
		await SpaceController.destroy({ params: { spaceID } }, res);
		await SpaceController.getByID({ params: { spaceID } }, res);

		expect(response.status).toBe('error');
		expect(response.message).toBeTruthy();
	});
});
