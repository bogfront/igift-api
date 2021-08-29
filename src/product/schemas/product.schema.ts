import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
	id: String,
	url: String,
	name: String,
	count: Number,
	description: String,
	image: String,
	wrap: String,
	receiver: String,
	comment: String
})
