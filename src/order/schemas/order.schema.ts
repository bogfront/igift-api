import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
	id: String,
	ownerId: String,
	products_ids: [ String ],
	status: String,
	comment: String
})
