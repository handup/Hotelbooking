import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, RoomFeatureDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll(); 
  }

  @Get('hotel/:id')
  findAllByHotel(@Param('id') hotelId: string) {
    return this.roomService.findAllByHotel(hotelId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Post(':id/add-features') 
  addFeaturesToRoom(@Param('id') roomId: string, @Body() roomFeatures: RoomFeatureDto[]) {
    return this.roomService.addFeaturesToRoom(roomId, roomFeatures);
  }

  @Delete(':id/remove-features')
  removeAllFeaturesFromRoom(@Param('id') roomId: string) {
   return this.roomService.removeAllFeaturesFromRoom(roomId);
  }
} 
