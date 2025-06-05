import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>) {
    const result = await this.usersRepository.update(id, user);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User deleted successfully.` };
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if(!user){
        throw new NotFoundException(`User with username ${username} is not found.`)
    }
    return user;
  }
  
  // Add a skill to a user's skill list
async addSkill(userId: number, skill: string) {
    const user = await this.findOne(userId);
    if (!user.skills) user.skills = [];
  
    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await this.usersRepository.save(user);
    }
  
    return user.skills;
  }
  
  // Remove a skill from a user's skill list
  async removeSkill(userId: number, skill: string) {
    const user = await this.findOne(userId);
    if (!user.skills) return [];
  
    user.skills = user.skills.filter((s) => s.toLowerCase() !== skill.toLowerCase());
    await this.usersRepository.save(user);
  
    return user.skills;
  }
  
  // Replace the entire skill list
  async updateSkills(userId: number, skills: string[]) {
    const user = await this.findOne(userId);
    user.skills = skills;
    await this.usersRepository.save(user);
  
    return user.skills;
  }
  
  // Optional: Get all skills of a user
  async getSkills(userId: number): Promise<string[]> {
    const user = await this.findOne(userId);
    return user.skills || [];
  }
  
}