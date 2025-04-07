import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResultData } from '@/utils/resultData';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    // 这里可以添加一些逻辑，比如保存到数据库
    return this.users.push(createUserDto);
  }

  findAll() {
    // return this.userList;
    return ResultData.success(this.users);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByName(username: string) {
    return this.users.find((item) => item.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
