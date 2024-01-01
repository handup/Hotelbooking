import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    var token = await this.authService.login(req.user)
    var currentUser = await this.userService.findOne(req.user._doc.username)
    return { token, user: currentUser };
  }

}
