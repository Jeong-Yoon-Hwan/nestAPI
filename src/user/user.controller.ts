import { Body, Controller,Get,Param,Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async Index(){
    return await this.service.findAll(); 
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto){
    return await this.service.create(createUserDto);
  }

  //username 값으로 조회
  @Get(":username")
  async getUser(@Param('username') username: string){
    return await this.service.findName(username)
  }
  

}
