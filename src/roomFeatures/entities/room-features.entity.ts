import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ collection: 'roomFeatures' }) 
export class RoomFeatures {
  @Prop()
  img: string;
  @Prop()
  name: string;
}

export const RoomFeaturesSchema = SchemaFactory.createForClass(RoomFeatures); 