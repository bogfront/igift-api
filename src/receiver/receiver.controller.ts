import { Body, Post, Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { ReceiverService } from './receiver.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('receiver')
@UseGuards(AuthGuard('jwt'))
export class ReceiverController {
	constructor(private readonly receiverService: ReceiverService) {}
	
	@Post('create')
	@UseGuards(RolesGuard)
	@Roles('User')
	async create (@Body() createReceiverDto: CreateReceiverDto) {
		try {
			const newReceiver = await this.receiverService.createReceiver(createReceiverDto);
			return new ResponseSuccess('RECEIVER.CREATE_SUCCESS', newReceiver);
		} catch (error) {
			return new ResponseError('RECEIVER.CREATE_ERROR', error);
		}
	}
}
