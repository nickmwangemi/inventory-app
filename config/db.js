const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const mongoDB = 'mongodb://localhost:27017/InventoryApp'

		const conn = await mongoose.connect(mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		console.log(`\nMongoDB Connected: ${conn.connection.host} `)
	} catch (error) {
		console.error(`\nError: ${error.message}`)
		process.exit(1)
	}
}
