import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMessageResponse } from '../../dtos/getMessage.dto';
import { Message } from '../../entities/message.entity';

@Injectable()
export class GetMessageCommand {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  public async getMessageBySenderAndRecipientId(
    senderId: string,
    recipientId: string,
  ): Promise<GetMessageResponse> {
    const messages: Message[] = await this.messageRepository.find({
      where: { sender: { id: senderId }, receiver: { id: recipientId } },
    });

    return this.constructGetMessageResponse(messages);
  }

  private constructGetMessageResponse(messages: Message[]): GetMessageResponse {
    const data = [];
    for (const message of messages) {
      data.push({ text: message.text });
    }
    return {
      data,
    };
  }
}
