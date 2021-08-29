import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceiverSchema } from './schemas/receiver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Receiver', schema: ReceiverSchema }])
  ],
  controllers: [ReceiverController],
  providers: [ReceiverService]
})
export class ReceiverModule {}
