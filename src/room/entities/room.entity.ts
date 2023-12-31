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
  @Prop([
    {
      img: String,
      name: String,
    },
  ])
  roomFeatures: Array<{ img: string; name: string }>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);