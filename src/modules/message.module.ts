import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateMessageCommand } from '../commands/messages/createMessage.command';
import { MessageController } from '../controllers/messages.controller';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Message])],
  controllers: [MessageController],
  providers: [CreateMessageCommand],
  exports: [CreateMessageCommand],
})
export class MessageModule {}
