import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetVacanciesDto } from './dto/getVacanciesDto';

type findAllVacanciesByRoomDTO = {
  startDate: Date;
  hotelId: string;
}

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('room/:roomId')
  findAllByRoom(@Param('roomId') roomId: string) {
    return this.bookingService.findAllByRoom(roomId);
  }



  @Post('room/vacancies')
  findAllVacanciesByRoom(@Body() inputDTO :findAllVacanciesByRoomDTO) {
    return this.bookingService.findAllByHotel(new Date(inputDTO.startDate), inputDTO.hotelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
