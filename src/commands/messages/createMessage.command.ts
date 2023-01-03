import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageRequest } from '../../dtos/createMessage.dto';
import { GetManyUserCommand } from '../users/getManyUser.command';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateMessageCommand {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private getManyUserCommand: GetManyUserCommand,
  ) {}

  public async createMessage(body: CreateMessageRequest): Promise<void> {
    const users: User[] = await this.getManyUserCommand.getManyUserById([
      body.senderId,
      body.recipientId,
    ]);

    const sender = users[0];
    const receiver = users[1];

    await this.messageRepository.save({
      text: body.text,
      sender,
      receiver,
    });
  }
}
