import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  beds: number;

  //bedSpaces is the number of people the room can house
  @Prop()
  bedsSpaces: number;

  @Prop()
  rooms: number;
  
  @Prop()
  name: string;

  @Prop()
  hotel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
}

export const RoomSchema = SchemaFactory.createForClass(Room);