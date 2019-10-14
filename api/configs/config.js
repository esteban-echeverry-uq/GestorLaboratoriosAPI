const DEVELOPMENT = require('./environments/dev');
const PRODUCTION = require('./environments/prod');
const ENV = require('./constants/environments');

const currentEnv = process.env.NODE_ENV || 'development';
const serverConfiguration = currentEnv === ENV.PRODUCTION ? PRODUCTION : DEVELOPMENT;

module.exports = {
	ENV: currentEnv,
	...serverConfiguration
};
