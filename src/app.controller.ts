import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService, private readonly userService: UsersService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    var token = await this.authService.login(req.user)
    var currentUser = await this.userService.findOne(req.user.username)
    return { token, user: currentUser };
  }

}
