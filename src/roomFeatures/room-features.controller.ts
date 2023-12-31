import { Controller,  Post, Body, Get, Param, NotFoundException, Delete, Patch } from '@nestjs/common';
import { RoomFeaturesService } from './room-features.service';
import { CreateRoomFeaturesDto } from './dto/create-room-feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room-feature.dto';

@Controller('room-features')
export class RoomFeaturesController {
  constructor(private readonly roomFeaturesService: RoomFeaturesService) {}

  // @Post()
  //  create(@Body() createRoomFeatureDtoArray: CreateRoomFeaturesDto[]) {
  //   return this.roomFeaturesService.createMultiple(createRoomFeatureDtoArray);
  // }

  @Post() // Define your route for creating multiple features
  async createMultiple(@Body() createRoomFeatureDtoArray: CreateRoomFeaturesDto[]) {
    const createdFeatures = await this.roomFeaturesService.createMultiple(createRoomFeatureDtoArray);
    return {
      message: 'Multiple room features created successfully',
      data: createdFeatures,
    };
  }

  @Get('all-room-features')
  findAll() {
    return this.roomFeaturesService.findAll(); 
  } 

  @Get(':id')
  async findFeature(@Param('id') featureID: string) {
    const feature = await this.roomFeaturesService.findFeature(featureID);
    if (!feature) {
      throw new NotFoundException('Feature not found'); // You can customize the error message as needed.
    }
    return feature;
  }

  @Delete(':id')
  async removeFeature(@Param('id') featureID: string) {
    const isDeleted = await this.roomFeaturesService.removeFeature(featureID);

    if (!isDeleted) {
      throw new NotFoundException('Feature not found'); // Customize the error message as needed.
    }
    return { message: 'Feature deleted successfully' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomFeatureDto: UpdateRoomFeatureDto) {
    return this.roomFeaturesService.update(id, updateRoomFeatureDto);
  }

  @Delete('/all-room-features')
  async deleteAllRoomFeatures() {
    const deletedCount = await this.roomFeaturesService.deleteAll();
    return {
      message: `Deleted ${deletedCount} room features`,
    };
  }

}
