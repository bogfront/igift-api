import * as mongoose from 'mongoose';

export const ReceiverSchema = new mongoose.Schema({
	id: String,
	name: String,
	phone: String,
	city: String,
	address: String,
	ownerId: String,
	available: Boolean
})
