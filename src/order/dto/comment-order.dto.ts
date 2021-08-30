import { Receiver } from '../../receiver/interfaces/receiver.interface';

export class CommentOrderDto {
	orderId: string;
	comment: string;
	receiver: Receiver;
}
