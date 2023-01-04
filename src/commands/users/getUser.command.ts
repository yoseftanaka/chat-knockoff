import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserCommand {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
}
