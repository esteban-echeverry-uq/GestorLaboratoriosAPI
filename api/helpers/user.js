module.exports = {
	controllerErrors: {
		ERROR_CREATING_USER: {
			MESSAGES: {},
			TYPE: 'ERROR_CREATING_USER'
		},
		ERROR_DELETING_USER: {
			MESSAGES: {},
			TYPE: 'ERROR_DELETING_USER'
		},
		ERROR_GETTING_USER: {
			MESSAGES: {
				USER_NOT_FOUND: 'The user you are trying to reach does not exist.'
			},
			TYPE: 'ERROR_GETTING_USER'
		},
		ERROR_GETTING_USERS: {
			MESSAGES: {},
			TYPE: 'ERROR_GETTING_USERS'
		},
		ERROR_UPDATING_USER: {
			MESSAGES: {},
			TYPE: 'ERROR_UPDATING_USER'
		},
		ERROR_WHILE_LOGIN: {
			MESSAGES: {
				INVALID_LOGIN_INFO: 'The email or password provide does not mach any user.'
			},
			TYPE: 'ERROR_WHILE_LOGIN'
		}
	}
};
