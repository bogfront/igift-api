import { Document } from 'mongoose';

export class Order extends Document {
	readonly status: string;
	products_ids: string[];
}
