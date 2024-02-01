const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'mysql',
});

const connection = async () => {
	await sequelize
		.authenticate()
		.then(() => console.log('database connected'))
		.catch((error) => console.error(error));
};


module.exports = connection;