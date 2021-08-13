import { HttpException } from '@nestjs/common';
import {
  PipeTransform,
  UsePipes,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';

@UsePipes()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    console.log(`PipeTransform...`); // [ApplicationModule] Request...
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return val;
  }
}
