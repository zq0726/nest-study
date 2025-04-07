import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  @ApiOperation({ summary: '用户添加' })
  @ApiBody({
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  findAll(@Request() req) {
    console.log('req', req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '通过id获取用户信息' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '通过id修改用户信息' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '通过id删除某个用户' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
