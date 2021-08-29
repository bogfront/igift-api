import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusesConstants } from './constants/order-statuses.constants';

@Injectable()
export class OrderService {
	constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}
	
	async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {
		const createdOrder = new this.orderModel({
			...createOrderDto,
			status: OrderStatusesConstants.DRAFT
		})
		
		return await createdOrder.save();
	}
}
