import { Document } from 'mongoose';

export interface Product extends Document {
	url: string;
	name: string;
	count: number;
	description: string;
	image: string;
	wrap: string;
	receiver: string;
	comment: string;
}
