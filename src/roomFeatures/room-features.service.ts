import { Injectable } from '@nestjs/common';
import { CreateRoomFeaturesDto } from './dto/create-room-feature.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomFeatures } from './entities/room-features.entity';
// import { RoomFeature } from './room-feature.entity';

@Injectable()
export class RoomFeaturesService {
  constructor(@InjectModel(RoomFeatures.name) private roomFeatureModel: Model<RoomFeatures>) {}

  async create(feature: CreateRoomFeaturesDto): Promise<RoomFeatures> {
    const createdFeature = new this.roomFeatureModel(feature);
    return await createdFeature.save();
  }
}



