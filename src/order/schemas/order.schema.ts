import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
	id: String,
	products_ids: [ String ],
	status: String
})
