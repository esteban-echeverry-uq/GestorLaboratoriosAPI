module.exports = {
	cleanDBError: (DBError) => {
		const firstDBError = DBError.split(',')[0];
		const DBErrorMessage = firstDBError.split(':')[2];
		return DBErrorMessage;
	},
	generalErrors: {
		GETTING_ENTITY: `El elemento que estas intentando obtener no existe.`,
		NOT_READY_TO_CONFIRM: 'Puedes confirmar la reserva solo 15 min antes de la hora de inicio',
		RESERVATION_NOT_PENDING: 'Esta reservación no se puede confirmar porque no esta pendiente',
		TIME_ALREADY_EXPIRED: 'La reservación que intentas confirmar ya expiro.',
		TIME_ALREADY_RESERVED: 'El tiempo que seleccionaste ya esta reservado.',
		WHILE_LOGIN: 'El email o la constraseña no coinciden.'
	},
	schemaErrors: {
		reservations: {
			ELEMENT_ID: 'La reservación debe tener una herramienta o salon al cual asignarla.',
			END_TIME: 'La reservación necesita una hora de finalización.',
			START_TIME: 'La reservación necesita una hora de inicio.',
			USER_ID: 'El usuario debe ser asignado.'
		},
		rooms: {
			NAME: 'Los salones necesitan un nombre.',
			QR: 'Se debe generar un codigo QR para cada salón.',
			SPACE_ID: 'Se debe asignar un espacio al cual pertenece este salón.'
		},
		spaces: {
			NAME: 'Los espacios de la universidad necesitan un nombre.'
		},
		tools: {
			NAME: 'Las herramientas necesitan un nombre.',
			QR: 'Se debe generar un codigo QR para cada herramienta.',
			SPACE_ID: 'Se debe asignar un espacio al cual pertenece esta herramienta.'
		},
		users: {
			EMAIL: 'El usuario necesita un email.',
			NAME: 'El usuario necesita un nombre.',
			PASSWORD: 'Se debe agregar una constraseña.'
		}
	}
};
