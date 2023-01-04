import { Injectable } from '@nestjs/common';
import { RegisterUserRequest } from '../../dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateUserCommand {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createNewUser(body: RegisterUserRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    body.password = hashedPassword;
    await this.userRepository.save(body);
  }
}
