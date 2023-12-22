import { Controller,  Post, Body } from '@nestjs/common';
import { RoomFeaturesService } from './room-features.service';
import { CreateRoomFeaturesDto } from './dto/create-room-feature.dto';

@Controller('room-features')
export class RoomFeaturesController {
  constructor(private readonly roomFeaturesService: RoomFeaturesService) {}

  @Post()
   create(@Body() createRoomFeatureDto: CreateRoomFeaturesDto) {
    return this.roomFeaturesService.create(createRoomFeatureDto);
  }

}
