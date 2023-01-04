import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListInvolvedConversationResponse } from '../../dtos/listInvolvedConversation.dto';
import { Message } from '../../entities/message.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class GetConversationCommand {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  public async listInvolvedConversation(
    viewerId: string,
  ): Promise<ListInvolvedConversationResponse> {
    const conversation = await this.messageRepository.query(
      `SELECT msg.\`text\`, COUNT(IF(receiverId = ?
      AND is_read = 0, 1, NULL)) AS unreadMessages, usr.name
      FROM messages msg
      JOIN users usr ON msg.receiverId = usr.id
      WHERE senderId = ?
      OR receiverId = ?
      GROUP BY msg.receiverId
      ORDER BY msg.created_at DESC;`,
      [viewerId, viewerId, viewerId],
    );

    return this.constructListInvolvedConversationResponse(conversation);
  }

  private constructListInvolvedConversationResponse(
    conversations,
  ): ListInvolvedConversationResponse {
    const result = conversations;
    return {
      data: result,
    };
  }
}
