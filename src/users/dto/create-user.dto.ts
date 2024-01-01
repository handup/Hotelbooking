import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/room/entities/room.entity";

export class CreateUserDto {

  @ApiProperty({ default: 'email', required: true })
  userId: string

  @ApiProperty({ default: 'username', required: true })
  username: string

  @ApiProperty({ default: "Password123", required: true })
  password: string

  @ApiProperty({ default: "", required: true })
  postNr: string

  @ApiProperty({ default: "", required: true })
  phoneNr: string

  @ApiProperty({ default: "", required: true })
  fullname: string
}
