const mongoose = require('mongoose');

const db = async() => {
	try {
		await mongoose.connect(process.env.DB_CHAIN_CONNECTION);

		console.log('🍀 DB Online...');
	} catch (error) {
		console.log(error);
		throw new Error('Error al inicializar la base de datos❌')
	}
}

module.exports = {
	db
}
