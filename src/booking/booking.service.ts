import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Model } from 'mongoose';
import { Room } from 'src/room/entities/room.entity';
import { InjectModel } from '@nestjs/mongoose';

function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

@Injectable()
export class BookingService {

  constructor(@InjectModel(Booking.name) private BookingModel: Model<Booking>,
    @InjectModel(Room.name) private RoomModel: Model<Room>) { }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const parentRoom = this.RoomModel.findById(createBookingDto.roomId)
    createBookingDto.room = await parentRoom;
    createBookingDto.startDate = new Date(createBookingDto.startDate);
    createBookingDto.endDate = new Date(createBookingDto.endDate);
    if (createBookingDto.room) {
      const createdBooking = new this.BookingModel(createBookingDto);
      return createdBooking.save();
    } else throw new NotFoundException("No room found")
  }

  findAll() {
    return this.BookingModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  findAllByRoom(roomId: string) {
    return this.BookingModel.find({ room: { id: roomId } }).exec();
  }

  // Complete insanity does not currently work
  async findAllVacanciesThisMonth(date: Date, roomId: string) : Promise<Date[][]> {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const bookingDatesthisMonth = await this.BookingModel
      .find({ room: { id: roomId } })
      .find({
        $or: [
          { startDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } },
          { endDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } },
        ]
      })
      .sort({ startDate: 1 }).exec()
      .then((bookings) => {
        return bookings.map((b) => [b.startDate, b.endDate])
      })
      
    if(!bookingDatesthisMonth.length) {
      // I give up
      return [[ new Date(-8640000000000000), 
        new Date(8640000000000000)]]
    }


    let gapsBetweenDates = [] as Date[][]
    
    const firstBooking = bookingDatesthisMonth[0][0]
    if(firstBooking > firstDayOfMonth) gapsBetweenDates.push([firstDayOfMonth, firstBooking])

      for(let i = 1; i < bookingDatesthisMonth.length - 1; i++){
        const current = bookingDatesthisMonth[i]
        const next = bookingDatesthisMonth[i+1]
        gapsBetweenDates.push([current[1], next[0]])
    }
    const lastBooking = bookingDatesthisMonth[bookingDatesthisMonth.length-1][1]
    if(lastBooking < lastDayOfMonth) gapsBetweenDates.push([lastBooking, lastDayOfMonth])
    const gapsBiggerThanOneDay = gapsBetweenDates.filter(g => dateDiffInDays(g[0], g[1]) > 1)
    return gapsBiggerThanOneDay // [[date, date], [date, date]]
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
