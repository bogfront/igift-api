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
import {OrdersModel, OrderStatus} from './orders.model';
import { FindOrderDto } from './dto/find-order.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.ordersService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req: any, @Body() dto: OrdersModel) {
    const user: string = req.user;
    const status = OrderStatus.CREATED;
    
    return this.ordersService.create({
      ...dto,
      user,
      status
    });
  }
  
  @UseGuards(JwtAuthGuard)
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
