import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Model } from 'mongoose';
import { Room } from 'src/room/entities/room.entity';
import { InjectModel } from '@nestjs/mongoose';

function dateDiffInDays(a, b) {
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
    if (createBookingDto.room) {
      const vacancies = await this.findAllVacanciesThisMonth(createBookingDto.startDate, createBookingDto.roomId);
      const freespace = vacancies.find((v) => v[0] < createBookingDto.startDate && createBookingDto.endDate < v[1])
      if (freespace) {
        const createdBooking = new this.BookingModel(createBookingDto);
        return createdBooking.save();
      } else throw new NotFoundException("room overbooked in period")
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

  async findAllVacanciesThisMonth(date: Date, roomId: string) {
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
    const gapsBetweenDates = bookingDatesthisMonth.reduce((a, b) => {
      return [a[1], b[0]]
    })
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
