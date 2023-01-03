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
    const sender: User = await this.getManyUserCommand.getUserById(
      body.senderId,
    );

    const receiver: User = await this.getManyUserCommand.getUserById(
      body.recipientId,
    );

    await this.messageRepository.save({
      text: body.text,
      sender,
      receiver,
    });
  }
}
