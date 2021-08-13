import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { OrdersModule } from './orders/orders.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypegooseModule } from 'nestjs-typegoose';
// import { getMongoConfig } from './configs/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {default as config} from './config';

// @Module({
//   imports: [
// 	ConfigModule.forRoot(),
// 	TypegooseModule.forRootAsync({
// 		imports: [ConfigModule],
// 		inject: [ConfigService],
// 		useFactory: getMongoConfig,
// 	}),
// 	OrdersModule,
// 	UsersModule,
// 	AuthModule
//   ],
//
// 	controllers: [AppController],
//
// 	providers: [AppService],
// })

const userString = config.db.user && config.db.pass ? (config.db.user + ':' + config.db.pass + '@') : '';
const authSource = config.db.authSource ? ('?authSource='+config.db.authSource + '&w=1') : '' ;

@Module({
	// tslint:disable-next-line:max-line-length
	imports: [MongooseModule.forRoot('mongodb://' + userString + config.db.host + ':' + (config.db.port || '27017') +'/' + config.db.database + authSource), UsersModule, AuthModule],

	controllers: [AppController],

	providers: [AppService],
})
export class AppModule {}
