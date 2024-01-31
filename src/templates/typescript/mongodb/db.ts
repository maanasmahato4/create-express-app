import mongoose from 'mongoose';

const connection = async () => {
	await mongoose
		.connect('mongodb uri')
		.then(() => console.log('database connected'))
		.catch((error) => console.error(error));
};

module.exports = connection;
