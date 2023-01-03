import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class GetManyUserCommand {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getManyUserById(ids: string[]): Promise<User[]> {
    return this.userRepository.find({ where: { id: In(ids) } });
  }
}
