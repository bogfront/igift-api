import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrdersService } from './orders.service';
import { OrdersModel } from './orders.model';

@Module({
  controllers: [OrdersController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrdersModel,
        schemaOptions: {
          collection: 'Orders',
        },
      },
    ]),
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
