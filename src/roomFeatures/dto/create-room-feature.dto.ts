import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomFeaturesDto {
  @ApiProperty({ default: "image", required: true })
  readonly img: string;

  @ApiProperty({ default: "Feature", required: true })
  readonly name: string;
}