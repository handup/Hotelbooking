import { ApiProperty } from "@nestjs/swagger";
import { Hotel } from "src/hotel/entities/hotel.entity";

export class CreateRoomDto {
    @ApiProperty({ default: 1, required: false })
    readonly adultGuests: number;
    @ApiProperty({ default: 1, required: false })
    readonly childGuests: number;
    @ApiProperty({ default: 1, required: false })
    readonly infantGuests: number;

    @ApiProperty({ default: 1, required: false })
    readonly price: number;

    @ApiProperty({ default: "description", required: false })
    readonly description: "description";
    @ApiProperty({ default: "image", required: false })
    readonly image: "image";
    @ApiProperty({ default: "Steve", required: false })
    readonly label: string;
    @ApiProperty({ default: "Steve", required: false })
    readonly hotelId: string;
    hotel: Hotel;
}
