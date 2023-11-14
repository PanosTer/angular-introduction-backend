import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  // GET endpoints

  @Get()
  async findAllUsers(){
    return await this.userService.findAllUsers();
  }

  @Get(':username')
  @UseGuards(AuthGuard)
  async findUserByUsername(@Param('username') username: string){
    return await this.userService.findUserByUsername(username);
  }

  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string){
    return await this.userService.findUserByEmail(email);
  }

  // POST endpoints

  @Post()
  async createUser(@Body(new ValidationPipe()) user: UserDto){
    try{
      return await this.userService.createUser(user);
    } catch (error){
      if (error.code == 11000){
        throw new HttpException('Username or Email exists', HttpStatus.CONFLICT);
      }else{
        throw new HttpException('Unexpected error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Post('bulk')
  async createUsers(@Body(new ValidationPipe()) users: UserDto[]){
    return await this.userService.createUsers(users);
  }
}
