import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receiver } from './interfaces/receiver.interface';
import { CreateReceiverDto } from './dto/create-receiver.dto';

@Injectable()
export class ReceiverService {
	constructor (@InjectModel('Receiver') private readonly receiverModel: Model<Receiver>) {}
	
	async createReceiver (createReceiverDto: CreateReceiverDto): Promise<Receiver> {
		const newReceiver = new this.receiverModel(createReceiverDto);
		return await newReceiver.save();
	}
}
