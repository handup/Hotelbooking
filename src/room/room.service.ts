import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private RoomModel: Model<Room>,
    @InjectModel(Hotel.name) private HotelModel: Model<Hotel>) { }

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

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.RoomModel.updateOne({ ...updateRoomDto, id })
  }

  remove(id: number) {
    return this.RoomModel.deleteOne({ id })
  }
}
