import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty({ example: 'Name' })
  name: string;
  
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;


}