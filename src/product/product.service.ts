import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { UrlDataResponseDto } from './dto/url-data.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateWrapDto } from './dto/update-wrap.dto';


@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
	
	async getUrlData (url: string): Promise<UrlDataResponseDto> {
		let response: UrlDataResponseDto;
		
		await fetch(url)
			.then(result => result.text())
			.then(html => {
				const $ = cheerio.load(html);
				const title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content');
				const image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content');
				const keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content');

				response = { title, image, keywords }
			}).catch(error => {
				throw new HttpException('PRODUCT.CANT_FETCH_META', HttpStatus.FORBIDDEN);
			})
		
		return response;
	}
	
	async createProduct (product: ProductDto): Promise<Product> {
		const createdProduct = new this.productModel(product);
		return await createdProduct.save();
	}
	
	async setProductWrap (updateWrapDto: UpdateWrapDto): Promise<Product> {
		const productFromDB = await this.productModel.findById(updateWrapDto.productId);
		if(!productFromDB) throw new HttpException('COMMON.PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
		
		productFromDB.wrap = updateWrapDto.wrapId;
		productFromDB.receiver = updateWrapDto.receiver;
		productFromDB.comment = updateWrapDto.comment;
		return await productFromDB.save();
	}
}
