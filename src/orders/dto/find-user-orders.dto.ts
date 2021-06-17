import { OrderStatus } from "../orders.constants";

export class FindUserOrdersDto {
  user: string;
  status: OrderStatus;
}
