module.exports = (entity) => {
	const errors = {
		GETTING_ENTITY: `The ${entity} that you are trying to find does not exist.`,
		TIME_ALREADY_RESERVED: 'The selected time is already taken.',
		WHILE_LOGIN: 'The email or password provide does not mach any user.',
	};

	return errors;
};
