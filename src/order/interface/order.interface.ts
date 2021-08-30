import { Document } from 'mongoose';
import { Product } from '../../product/interfaces/product.interface';
import { OrderStatusesConstants } from '../constants/order-statuses.constants';
import { Receiver } from '../../receiver/interfaces/receiver.interface';

export class Order extends Document {
	ownerId: string;
	status: OrderStatusesConstants;
	products: Product[];
	comment: string;
	number: number;
	receiver: Receiver;
	created_at: string;
	updated_at: string;
}
