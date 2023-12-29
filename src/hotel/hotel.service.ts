import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Model } from 'mongoose';
import { Hotel } from './entities/hotel.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) { }

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelDto);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
  async findAllByCity(city: string): Promise<Hotel[]> {
    return this.hotelModel.find({ city }).exec();
  }

  async findOne(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  update(id: string, updateHotelDto: UpdateHotelDto) {
    return this.hotelModel.updateOne({ _id: id }, { ...updateHotelDto })
  }

  remove(id: string) {
    return this.hotelModel.deleteOne({ _id: id })
  }
}
