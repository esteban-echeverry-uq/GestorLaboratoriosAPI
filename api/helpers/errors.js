module.exports = (entity) => {
	const errors = {
		CREATING_ENTITY: `There was a problem when trying to create the ${entity}`,
		DELETING_ENTITY: `There was a problem when trying to delete the ${entity}`,
		GETTING_ENTITY: `The ${entity} that you are trying to find does not exist.`,
		GETTING_ALL_ENTITIES: `There was a problem when trying to get all the ${entity}s.`,
		UPDATING_ENTITY: `'There was an error trying to update the ${entity}`,
		TIME_ALREADY_RESERVED: 'The selected time is already taken.',
		WHILE_LOGIN: 'The email or password provide does not mach any user.',
	};

	return errors;
};
