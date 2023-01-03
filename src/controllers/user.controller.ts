import { Controller, Get, Query } from '@nestjs/common';
import { GetConversationCommand } from '../commands/users/getConversation.command';

@Controller('users')
export class UserController {
  constructor(private getConversationCommand: GetConversationCommand) {}

  @Get('list/involved-conversation')
  public async listInvolvedConversation(
    @Query('viewerId') viewerId: string,
  ): Promise<any> {
    return this.getConversationCommand.listInvolvedConversation(viewerId);
  }
}
