import { Document } from 'mongoose';

export class Order extends Document {
	ownerId: string;
	status: string;
	products_ids: string[];
	comment: string;
}
