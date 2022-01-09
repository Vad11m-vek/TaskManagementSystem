const { Schema, model } = require('mongoose')

const schema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
	confirmationCode: { type: String, unique: true }
})
module.exports = model('User', schema)