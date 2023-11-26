import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async create(newUser: CreateUserDto): Promise<User> {
        const createdUser = new this.UserModel(newUser);
        return createdUser.save();
    }

    async findOne(username: string): Promise<User> {
        return this.UserModel.findOne({username: username}).exec();
    }
}