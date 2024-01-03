import { PartialType } from '@nestjs/swagger';
import { CreateRoomFeaturesDto } from './create-room-feature.dto';


export class UpdateRoomFeatureDto  extends PartialType(CreateRoomFeaturesDto) {}
