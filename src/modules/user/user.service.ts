import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResultData } from '@/utils/resultData';

@Injectable()
export class UserService {
  userList = [];

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    // 这里可以添加一些逻辑，比如保存到数据库
    return this.userList.push(createUserDto);
  }

  findAll() {
    // return this.userList;
    return ResultData.success(this.userList);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
