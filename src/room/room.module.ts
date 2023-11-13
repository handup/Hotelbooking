import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './entities/room.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/hotel/entities/hotel.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule { }
