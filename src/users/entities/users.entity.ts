import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;
// This should be a real class/interface representing a user entity
@Schema()
export class User {
    @Prop()
    userId: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop()
    postNr: string

    @Prop()
    phoneNr: string

    @Prop()
    fullname: string
}

export const UserSchema = SchemaFactory.createForClass(User);