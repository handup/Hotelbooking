import { Injectable, NotFoundException } from '@nestjs/common';
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
    // const roomFeature = this.roomFeatureModel.findById(id).exec();

    // if (!roomFeature) {
    //   throw new NotFoundException(`Room feature with id ${id} not found`);
    // }

    // if (updateRoomFeatureDto.name) {
    //   roomFeature.name = updateRoomFeatureDto.name;
    // }

    return `This action updates a #${id} room-feature`;

  }
}
 


