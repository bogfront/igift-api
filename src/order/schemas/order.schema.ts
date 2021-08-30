import * as mongoose from 'mongoose';
import { ProductSchema } from '../../product/schemas/product.schema';
import { ReceiverSchema } from '../../receiver/schemas/receiver.schema';

export const OrderSchema = new mongoose.Schema({
	id: String,
	ownerId: String,
	products: [ ProductSchema ],
	status: String,
	comment: String,
	number: Number,
	receiver: ReceiverSchema
}, {
	timestamps: true
})
