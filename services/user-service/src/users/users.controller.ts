import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-users' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get-user' })
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-user' })
  update(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'delete-user' })
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'get-user-by-username' })
  findByUsername(@Payload() username: string) {
    return this.usersService.findByUsername(username);
  }

  // === Skills Endpoints ===

  @MessagePattern({ cmd: 'get-skills' })
  getSkills(@Payload() id: number) {
    return this.usersService.getSkills(id);
  }

  @MessagePattern({ cmd: 'add-skill' })
  addSkill(@Payload() payload: { id: number; skill: string }) {
    return this.usersService.addSkill(payload.id, payload.skill);
  }

  @MessagePattern({ cmd: 'remove-skill' })
  removeSkill(@Payload() payload: { id: number; skill: string }) {
    return this.usersService.removeSkill(payload.id, payload.skill);
  }

  @MessagePattern({ cmd: 'update-skills' })
  updateSkills(@Payload() payload: { id: number; skills: string[] }) {
    return this.usersService.updateSkills(payload.id, payload.skills);
  }
}
