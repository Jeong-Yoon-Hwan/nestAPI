import { Body, Controller,Get,Post } from '@nestjs/common';
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

}
