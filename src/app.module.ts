import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

// node-network:27
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    HotelModule,
    RoomModule,
    BookingModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
