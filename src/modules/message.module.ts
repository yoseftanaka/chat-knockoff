import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateMessageCommand } from '../commands/messages/createMessage.command';
import { MessageController } from '../controllers/messages.controller';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { UserModule } from './user.module';
import { GetMessageCommand } from '../commands/messages/getMessage.command';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Message])],
  controllers: [MessageController],
  providers: [CreateMessageCommand, GetMessageCommand],
  exports: [CreateMessageCommand, GetMessageCommand],
})
export class MessageModule {}
