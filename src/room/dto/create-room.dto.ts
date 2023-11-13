import { ApiProperty } from "@nestjs/swagger";
import { Hotel } from "src/hotel/entities/hotel.entity";

export class CreateRoomDto {
    @ApiProperty({default: 1, required: false})
    readonly beds: number;
    @ApiProperty({default: 1, required: false})
    readonly bedsSpaces: number;
    @ApiProperty({default: 1, required: false})
    readonly rooms: number;
    @ApiProperty({default: "Steve", required: false})
    readonly name: string;
    @ApiProperty({default: "Steve", required: false})
    readonly hotelId: string;
    hotel: Hotel;
}
