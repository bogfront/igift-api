import { Injectable } from '@nestjs/common';
import {OrdersModel} from './orders.model';
import {ModelType, DocumentType} from '@typegoose/typegoose/lib/types';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrdersModel)
    private readonly ordersModel: ModelType<OrdersModel>,
  ) {}

  async create(dto: CreateOrderDto): Promise<DocumentType<OrdersModel>> {
    //@ts-ignore
    return this.ordersModel.create(dto);
  }
  
  async find() {
    return this.ordersModel.find().exec();
  }
  
  async findById(id: string) {
    return this.ordersModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.ordersModel.findByIdAndDelete(id).exec();
  }
  
  async getCount() {
    return this.ordersModel.countDocuments();
  }
}
