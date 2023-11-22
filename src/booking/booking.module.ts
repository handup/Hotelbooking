import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/room/entities/room.entity';
import { Booking, BookingSchema } from './entities/booking.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
