import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomFeaturesDto {
  @ApiProperty({ default: "image", required: true })
  img: string;

  @ApiProperty({ default: "Feature", required: true })
  name: string;
}