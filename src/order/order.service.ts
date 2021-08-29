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
	
	async changeStatus (orderId: string, status): Promise<Order> {
		if (!Object.values(OrderStatusesConstants).includes(status)) {
			throw new HttpException('ORDER.STATUS_NOT_FOUND', HttpStatus.NOT_FOUND);
		}
		
		const orderFromDB = await this.orderModel.findById(orderId);
		if(!orderFromDB) throw new HttpException('COMMON.ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
		
		orderFromDB.status = status;
		return await orderFromDB.save();
	}
	
	async getOrder (orderId: string): Promise<Order> {
		const orderFromDB = await this.orderModel.findById(orderId);
		if(!orderFromDB) throw new HttpException('COMMON.ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
		
		return orderFromDB;
	}
	
	async getUserOrders (userId: string, filters?: {}): Promise<Order[]> {
		const ordersFromDB = await this.orderModel.find({ ownerId: userId, ...filters });
		if(!ordersFromDB) throw new HttpException('COMMON.ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
		
		return ordersFromDB;
	}
}
