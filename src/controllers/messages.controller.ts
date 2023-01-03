import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateMessageCommand } from '../commands/messages/createMessage.command';
import { CreateMessageRequest } from '../dtos/createMessage.dto';

@Controller('messages')
export class MessageController {
  constructor(private createMessageCommand: CreateMessageCommand) {}

  @Post()
  public async createMessage(@Body() body: CreateMessageRequest) {
    return this.createMessageCommand.createMessage(body);
  }
}
