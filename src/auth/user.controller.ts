import {
  Controller, Get,
  UseGuards, Request
} from '@nestjs/common';
import {JwtAuthGuard} from "./guards/jwt.guard";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    // @ts-ignore
    const { email, phone, name, secondName } = await this.userService.findUser(req.user);

    return { email, phone, name, secondName}
  }
}
