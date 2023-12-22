import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'roomFeatures' }) // I dont know how else to name a collection than adding it here  
export class RoomFeatures extends Document {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  name: string;
}

export const RoomFeaturesSchema = SchemaFactory.createForClass(RoomFeatures);