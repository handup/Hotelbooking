import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/room/entities/room.entity';

export class CreateBookingDto {
    
  @ApiProperty({default: new Date(), required: true})
  startDate: Date
  
  @ApiProperty({default: new Date(), required: true})
  endDate: Date;

  @ApiProperty({ default: 'test@gmail.com', required: true })
  userId: string;

  @ApiProperty({ default: '1234', required: true })
  readonly roomId: string;
  room: Room;
}
