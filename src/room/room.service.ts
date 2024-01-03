import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto, RoomFeatureDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotel } from '../hotel/entities/hotel.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<Room>,
    @InjectModel(Hotel.name) private HotelModel: Model<Hotel>
    ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> { 
    const parentHotel = this.HotelModel.findById(createRoomDto.hotelId)
    createRoomDto.hotel = await parentHotel;
    const createdRoom = new this.RoomModel(createRoomDto);
    return createdRoom.save();
  }

  findAll() {
    return this.RoomModel.find().exec();
  }

  findAllByHotel(hotelId: string) {
    const objectId = new Types.ObjectId(hotelId);
    return this.RoomModel.find({ hotel: objectId }).exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.RoomModel.updateOne({ _id: id }, { ...updateRoomDto })
  }

  remove(id: string) {
    return this.RoomModel.deleteOne({ _id: id })
  }

  async addFeaturesToRoom(roomId: string, roomFeatures: RoomFeatureDto[]) {
    // Find the room by ID
    const room = await this.RoomModel.findById(roomId).exec();
  
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
  
    // Create an array of new room features based on the DTOs
    const newRoomFeatures = roomFeatures.map((featureDto) => ({
      img: featureDto.img,
      name: featureDto.name,
    }));
  
    // Concatenate the new room features to the 'roomFeatures' array
    room.roomFeatures = room.roomFeatures.concat(newRoomFeatures);
  
    // Save the updated room
    const updatedRoom = await room.save();
  
    return updatedRoom;
  }

  async removeAllFeaturesFromRoom(roomId: string) {
    // Find the room by ID
    const room = await this.RoomModel.findById(roomId).exec();
  
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
  
    // Clear the 'roomFeatures' array
    room.roomFeatures = [];
  
    // Save the updated room
    const updatedRoom = await room.save();
  
    return updatedRoom; 
  }

}
