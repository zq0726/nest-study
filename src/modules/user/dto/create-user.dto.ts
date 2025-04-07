import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: '请输入用户名',
  })
  username: string;

  @IsString({
    message: '请输入密码',
  })
  password: string;

  hobby?: string;
}
