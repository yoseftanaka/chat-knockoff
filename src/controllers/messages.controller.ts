import { Controller, Get, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateMessageCommand } from '../commands/messages/createMessage.command';
import { GetMessageCommand } from '../commands/messages/getMessage.command';
import { CreateMessageRequest } from '../dtos/createMessage.dto';
import { GetMessageRequest, GetMessageResponse } from '../dtos/getMessage.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(
    private createMessageCommand: CreateMessageCommand,
    private getMessageCommand: GetMessageCommand,
  ) {}

  @Post()
  public async createMessage(
    @Body() body: CreateMessageRequest,
  ): Promise<void> {
    return this.createMessageCommand.createMessage(body);
  }

  @Get('list')
  public async getMessages(
    @Body() body: GetMessageRequest,
  ): Promise<GetMessageResponse> {
    return this.getMessageCommand.getMessageBySenderAndRecipientId(
      body.searchedUserId,
      body.viewerId,
    );
  }
}
