import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusesConstants } from './constants/order-statuses.constants';
import { CommentOrderDto } from './dto/comment-order.dto';

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
	
	async commentOrder (commentOrderDto: CommentOrderDto): Promise<Order> {
		const orderFromDB = await this.orderModel.findById(commentOrderDto.orderId);
		if(!orderFromDB) throw new HttpException('COMMON.ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
		
		orderFromDB.comment = commentOrderDto.comment;
		return await orderFromDB.save();
	}
}
