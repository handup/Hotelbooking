import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomFeaturesService } from './room-features.service';
import { RoomFeaturesController } from './room-features.controller';
import { RoomFeatures, RoomFeaturesSchema } from './entities/room-features.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoomFeatures.name, schema: RoomFeaturesSchema }]),
    // other imports...
  ],
  controllers: [RoomFeaturesController],
  providers: [RoomFeaturesService],
})
export class RoomFeaturesModule {}
