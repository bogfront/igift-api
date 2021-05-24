import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum OrderStatus {
  CREATED= 'created'
}

class Product extends Base {
  @prop()
  uri: string;

  @prop()
  name: string;

  @prop()
  count: number;

  @prop()
  comment: string;
}

class Package {
  @prop({ type: () => [Number] })
  productIds: number[];

  @prop()
  designId: string;

  @prop()
  comment: string;

  @prop()
  price: number;
}

class Recipient {
  @prop()
  name: string;

  @prop()
  phone: string;

  @prop()
  city: string;

  @prop()
  address: string;

  @prop()
  deliveryTime: number;

  @prop()
  comment: string;
}

export interface OrdersModel extends Base {}
export class OrdersModel extends TimeStamps {
  @prop()
  user: string;
  
  @prop()
  status: OrderStatus;

  @prop()
  paymentUri: string;

  @prop()
  address: string;

  @prop({ type: () => [Product] })
  products: Product[];

  @prop({ type: () => [Package] })
  packages: Package[];

  @prop({ type: () => Recipient })
  recipient: Recipient;
}
