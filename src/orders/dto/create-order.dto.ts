import { Type } from 'class-transformer';
import {IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { OrderStatus } from "../orders.model";

class ProductDto {
  @IsString()
  uri: string;

  @IsString()
  name: string;

  @IsNumber()
  count: number;

  @IsString()
  comment: string;
}

class PackageDto {
  @IsArray()
  @IsString({ each: true })
  productIds: number[];

  @IsString()
  designId: string;

  @IsString()
  comment: string;

  @IsNumber()
  price: number;
}

class RecipientDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsNumber()
  deliveryTime: number;

  @IsString()
  comment: string;
}

export class CreateOrderDto {
  @IsString()
  user: string;
  
  @IsString()
  status: OrderStatus;

  @IsString()
  paymentUri: string;

  @IsArray()
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsArray()
  @Type(() => PackageDto)
  packages: PackageDto[];

  @Type(() => RecipientDto)
  recipient: RecipientDto;
}
