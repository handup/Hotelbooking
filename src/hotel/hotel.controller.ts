import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get('bycity/:city')
  findAllByCity(@Param('city') city: string) {
    return this.hotelService.findAllByCity(city);
  }

  @Get(':id')
  findOneWithRooms(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
