import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto, CheckEmailDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const oldUser = await this.authService.findUser(dto.email);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }
  
  @Post('check-email')
  async checkEmail (@Body() dto: CheckEmailDto) {
    const oldUser = await this.authService.findUser(dto.email);
  
    return { isFree: !oldUser }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const { email: responseEmail } = await this.authService.validateUser(email, password);
    return this.authService.login(responseEmail);
  }
}
