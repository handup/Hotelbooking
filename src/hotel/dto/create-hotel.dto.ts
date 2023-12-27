import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {

  @ApiProperty({
    description: 'The name of the hotel',
    name: 'name',
    default: 'Steve'
  })
  readonly name: string;

  @ApiProperty({
    description: 'The name of the hotel',
    name: 'city',
    default: 'Parihhh'
  })
  readonly city: string;

  @ApiProperty({
    description: 'The name of the hotel',
    name: 'address',
    default: 'Somewehere Else'
  })
  readonly address: string;

  @ApiProperty({
    description: 'The image',
    name: 'image',
    default: 'google.com'
  })
  readonly image: string;
}

