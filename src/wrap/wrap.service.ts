import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wrap } from './interfaces/wrap.interface';
import { WrapStatusesConstants } from './constants/wrap-statuses.constants';

@Injectable()
export class WrapService {
	constructor(@InjectModel('Wrap') private readonly wrapModel: Model<Wrap>) {}
	
	async getWrapItems () {
		const wrapItems = await this.wrapModel.find().exec();
		return wrapItems;
	}
	
	async createWrap () {
		const createdWrap = new this.wrapModel({
			status: WrapStatusesConstants.AVAILABLE
		});
		
		return await createdWrap.save()
	}
}
