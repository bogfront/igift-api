import { Post, UseGuards, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
	constructor(private readonly orderService: OrderService) {}
	
	@Post('create')
	@UseGuards(RolesGuard)
	@Roles('User')
	async createOrder (@Body() createOrderDto: CreateOrderDto) {
		try {
			const newOrder = await this.orderService.createOrder(createOrderDto)
			return new ResponseSuccess('ORDER.CREATE_SUCCESS', newOrder);
		} catch (error) {
			return new ResponseError('ORDER.CREATE_ERROR', error);
		}
	}
}
