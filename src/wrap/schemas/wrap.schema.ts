import * as mongoose from 'mongoose';

export const WrapSchema = new mongoose.Schema({
	id: String,
	status: String
})
