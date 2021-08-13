import {
  Body,
  Controller,
  Patch,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  HttpCode,
  Request
} from '@nestjs/common';
import { OrdersModel } from './orders.model';
import { OrderStatus } from './orders.constants';
import { FindOrderDto } from './dto/find-order.dto';
import { OrdersService } from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {GetAllOrdersDto} from './dto/get-all-orders.dto';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Post()
  async getAll(@Request() req: GetAllOrdersDto, @Body() dto: FindOrderDto) {
	const user: string = req.user;

	return this.ordersService.find({
		...dto,
		user
	});
  }

  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Request() req: any, @Body() dto: CreateOrderDto) {
	const user: string = req.user;
	const status = OrderStatus.CREATED;
	const number = await this.ordersService.getCount();

	return this.ordersService.create({
		...dto,
		user,
		status,
		number
	});
  }

  @UseGuards(RolesGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
	return this.ordersService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
	return this.ordersService.deleteById(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: OrdersModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindOrderDto) {}
}
