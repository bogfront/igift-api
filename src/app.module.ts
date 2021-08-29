import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {default as config} from './config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { WrapModule } from './wrap/wrap.module';

const userString = config.db.user && config.db.pass ? (config.db.user + ':' + config.db.pass + '@') : '';
const authSource = config.db.authSource ? ('?authSource='+config.db.authSource + '&w=1') : '' ;

@Module({
	// tslint:disable-next-line:max-line-length
	imports: [MongooseModule.forRoot('mongodb://' + userString + config.db.host + ':' + (config.db.port || '27017') +'/' + config.db.database + authSource),
		UsersModule,
		AuthModule,
		ProductModule,
		OrderModule,
		WrapModule
	],

	controllers: [AppController],

	providers: [AppService],
})
export class AppModule {}
