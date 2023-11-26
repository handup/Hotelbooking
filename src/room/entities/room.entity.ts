import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  label: string;
  @Prop()
  adultGuests: number;
  @Prop()
  childGuests: number;
  @Prop()
  infantGuests: number;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop({ type: Types.ObjectId, ref: 'Hotel' })
  hotel: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);