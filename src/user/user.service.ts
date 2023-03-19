import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  
  async create(createUserDto: CreateUserDto): Promise<User>{
   
    const username = createUserDto.username;
    const findUser = await this.findName(username);

    if(findUser){
      throw new HttpException("이미 존재하는 username 을 입력하셨습니다", HttpStatus.BAD_REQUEST)
    }

    const createUser = new this.userModel({...createUserDto});
    return createUser.save();
  }

  async findAll(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  // async findOne(id: string): Promise<User> {
  //   return await this.userModel.findById(id).exec();
  // }
  
  
  // 'username'으로 DB조회
  async findOne(username: string): Promise<User | undefined>{
    return this.userModel.findOne({username: username}).exec();
  }

  async findName(username: string): Promise<User>{
    return await this.userModel.findOne({username: username}).exec();
  }

}
