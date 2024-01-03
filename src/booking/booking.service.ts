import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Model } from 'mongoose';
import { Room } from '../room/entities/room.entity';
import { InjectModel } from '@nestjs/mongoose';

const seeIfDateValid = (dates: string[], startDate: Date, endDate: Date) : boolean => {
  // Make sure the start date is before or equal to the end date
  if (startDate > endDate) {
    console.error("Start date should be before or equal to end date");
    return;
  }
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {

    if(dates.find(x => x === currentDate.toISOString().split('T')[0]))
      currentDate.setDate(currentDate.getDate() + 1);
    else return false
  }
  return true
}

function subtractDatesArray(arr1: string[], arr2: string[]): string[] {
  // Create a Set from arr2 for faster lookups
  const dateSet = new Set(arr2);

  // Filter dates from arr1 that are not present in arr2
  const subtractedDates = arr1.filter(date => !dateSet.has(date));

  return subtractedDates;
}

@Injectable()
export class BookingService {

  constructor(@InjectModel(Booking.name) private BookingModel: Model<Booking>,
    @InjectModel(Room.name) private RoomModel: Model<Room>) { }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const parentRoom = this.RoomModel.findById(createBookingDto.roomId)
    createBookingDto.room = await parentRoom;

    const vacancies = await this.findAllVacanciesInRoomThisMonth(
      createBookingDto.startDate, 
      createBookingDto.roomId
    )

    const validDate = seeIfDateValid(vacancies, createBookingDto.startDate, createBookingDto.endDate)

    if (createBookingDto.room && validDate) {
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

  async findAllByHotel(startDate:Date, hotelId: string) : Promise<any> {
    const objectId = new Types.ObjectId(hotelId);
    console.log(hotelId)
    const rooms = await this.RoomModel.find({ hotel: objectId });
    return await Promise.all(rooms.map(async r => {
      const vacancies = await this.findAllVacanciesInRoomThisMonth(startDate, r.id)
      return {id: r.id, gaps: vacancies, price: r.price}
    }))
    
  }

  async findAllVacanciesInRoomThisMonth(dateStr: Date, roomId: string) : Promise<string[]> {
    const date = new Date(dateStr)
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const bookingDatesthisMonth = await this.BookingModel
      .find({ "room._id": new Types.ObjectId(roomId) })
      .sort({ startDate: 1 }).exec()
      .then((bookings) => {
        return bookings.map((b) => [b.startDate, b.endDate])
      })
  // Step 1: Create an array of all dates covered by bookings
  const allDates = [] ;
  for (let currentDay = firstDayOfMonth; currentDay <= lastDayOfMonth; currentDay.setDate(currentDay.getDate() + 1)) {
    // Format the date as "YYYY-MM-DD"
    const formattedDate = currentDay.toISOString().split('T')[0];
    allDates.push(formattedDate);
  }

  const bookingDates = []
  bookingDatesthisMonth.forEach(booking => {
      const startDate = new Date(booking[0]);
      const endDate = new Date(booking[1]);
  
      // Add all dates within the booking period to the array
      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        bookingDates.push(currentDate.toISOString().split('T')[0]);
      }
  });

  const gaps = subtractDatesArray(allDates, bookingDates)
  return gaps;
  
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
