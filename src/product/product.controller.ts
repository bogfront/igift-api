import {
	Body, Controller, Post,
	UseGuards, Get, Param
} from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { ProductService } from './product.service';
import { UrlDataDto } from './dto/url-data.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from './dto/product.dto';
import { UpdateWrapDto } from './dto/update-wrap.dto';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
	constructor(private readonly productService: ProductService) {}
	
	@Post('url-data')
	@UseGuards(RolesGuard)
	@Roles('User')
	async getUrlData (@Body() urlData: UrlDataDto) {
		try {
			const info = await this.productService.getUrlData(urlData.url);
			return new ResponseSuccess('PRODUCT.METADATA_GET', info);
		} catch (error) {
			return new ResponseError('PRODUCT.GET_URL-DATA', error);
		}
	}
	
	@Post('create')
	@UseGuards(RolesGuard)
	@Roles('User')
	async create (@Body() productDto: ProductDto) {
		try {
			const product = await this.productService.createProduct(productDto)
			return new ResponseSuccess('PRODUCT.CREATED_SUCCESS', product);
		} catch (error) {
			return new ResponseError('PRODUCT.CREATE_ERROR', error);
		}
	}
	
	@Post('update-wrap')
	@UseGuards(RolesGuard)
	@Roles('User')
	async setWrap (@Body() updateWrapDto: UpdateWrapDto) {
		try {
			const product = await this.productService.setProductWrap(updateWrapDto);
			return new ResponseSuccess('PRODUCT.UPDATE-WRAP_SUCCESS', product);
		} catch (error) {
			return new ResponseError('PRODUCT.UPDATE-WRAP_ERROR', error);
		}
	}
}
