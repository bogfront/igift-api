import { Module } from '@nestjs/common';
import { WrapController } from './wrap.controller';
import { WrapService } from './wrap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WrapSchema } from './schemas/wrap.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wrap', schema: WrapSchema }])
  ],
  controllers: [WrapController],
  providers: [WrapService]
})
export class WrapModule {}
