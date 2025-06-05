import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../services/user-service/src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new InternalServerErrorException('Internal server error during user validation');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;
      const user = await this.usersService.findByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalid credentials');
      }

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Internal server error during login');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const { name, username, password } = registerDto;

      const existingUser = await this.usersService.findByUsername(username).catch(() => null);
      if (existingUser) {
        throw new BadRequestException(`Username "${username}" is already taken.`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.usersService.create({
        name,
        username,
        password: hashedPassword,
      });

      return { message: 'Registration successful' };
    } catch (err) {
      console.error('Registration Error:', err);
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException('Registration failed. Please try again later.');
    }
  }
}
