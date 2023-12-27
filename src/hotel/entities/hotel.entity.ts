import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop()
  name: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);