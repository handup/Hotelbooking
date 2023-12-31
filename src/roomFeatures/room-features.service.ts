import { Injectable } from '@nestjs/common';
import { CreateRoomFeaturesDto } from './dto/create-room-feature.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomFeatures } from './entities/room-features.entity';
import { UpdateRoomFeatureDto } from './dto/update-room-feature.dto';
// import { RoomFeature } from './room-feature.entity';

@Injectable()
export class RoomFeaturesService {
  constructor(
    @InjectModel(RoomFeatures.name)
    private roomFeatureModel: Model<RoomFeatures>,
  ) {}

  async create(feature: CreateRoomFeaturesDto): Promise<RoomFeatures> {
    const createdFeature = new this.roomFeatureModel(feature);
    return await createdFeature.save();
  }

  async createMultiple(createRoomFeatureDtoArray: CreateRoomFeaturesDto[]): Promise<RoomFeatures[]> {
    const createdFeatures = await this.roomFeatureModel.create(createRoomFeatureDtoArray);
    return createdFeatures;
  }

  findAll() {
    return this.roomFeatureModel.find().exec();
  }

  findFeature(featureId: string) {
    return this.roomFeatureModel.findById(featureId).exec();
  }

  removeFeature(featureId: string) {
    return this.roomFeatureModel.findByIdAndDelete(featureId).exec();
  }

  update(id: string, updateRoomFeatureDto: UpdateRoomFeatureDto) {
    return this.roomFeatureModel.updateOne({ ...updateRoomFeatureDto, _id: id })
  }

  deleteAll() {
    return this.roomFeatureModel.deleteMany({}).exec();;
  }

}
 


