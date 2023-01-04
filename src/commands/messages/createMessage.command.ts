import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageRequest } from '../../dtos/createMessage.dto';
import { GetUserCommand } from '../users/getUser.command';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateMessageCommand {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private getUserCommand: GetUserCommand,
  ) {}

  public async createMessage(body: CreateMessageRequest): Promise<void> {
    const sender: User = await this.getUserCommand.getUserById(body.senderId);

    const receiver: User = await this.getUserCommand.getUserById(
      body.recipientId,
    );

    await this.messageRepository.save({
      text: body.text,
      sender,
      receiver,
    });
  }
}
