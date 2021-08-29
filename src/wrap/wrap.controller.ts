import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WrapService } from './wrap.service';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { CreateWrapDto } from './dto/create-wrap.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('wrap')
export class WrapController {
	constructor(private readonly wrapService: WrapService) {}
	
	@Get('items')
	async getWrapItems () {
		try {
			const wrapItems = await this.wrapService.getWrapItems();
			return new ResponseSuccess('WRAP.GET-ITEMS', wrapItems)
		} catch (error) {
			return new ResponseError('WRAP.GET-ITEMS_ERROR', error);
		}
	}
	
	@Post('create')
	// @UseGuards(RolesGuard) TODO: добавить админа
	// @Roles('Admin')
	async createWrap () {
		try {
			const createdWrap = await this.wrapService.createWrap();
			return new ResponseSuccess('WRAP.CREATE', createdWrap)
		} catch (error) {
			return new ResponseError('WRAP.CREATE_ERROR', error);
		}
	}
}
