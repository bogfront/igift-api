import { Product } from '../../product/interfaces/product.interface';

export class CreateOrderDto {
	ownerId: string;
	products: Product[];
}
