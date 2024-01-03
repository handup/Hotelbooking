import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/room/entities/room.entity';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
    
  @Prop()
  startDate: Date

  //bedSpaces is the number of people the room can house
  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop({type: Room})
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
}


export const BookingSchema = SchemaFactory.createForClass(Booking);