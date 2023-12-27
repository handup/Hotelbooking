import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth-guard';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  create(@Body() createHotelDto: CreateUserDto) {
    return this.userService.create(createHotelDto);
  }
}
