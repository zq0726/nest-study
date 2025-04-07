import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsString({
    message: '请输入用户名',
  })
  username: string;

  @ApiProperty()
  @IsString({
    message: '请输入密码',
  })
  password: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional() // 明确标记为可选
  hobby?: string;
}
