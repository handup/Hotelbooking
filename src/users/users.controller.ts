import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  create(@Body() createHotelDto: CreateUserDto) {
    return this.userService.create(createHotelDto);
  }
}
