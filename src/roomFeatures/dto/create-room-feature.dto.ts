import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomFeaturesDto {
  @ApiProperty({ default: "image", description:"The image", name: "image",  required: true })
  readonly img: string;

  @ApiProperty({ default: "Feature", description:"This is the name of the feature", name: "TV",  required: true })
  readonly name: string;
}