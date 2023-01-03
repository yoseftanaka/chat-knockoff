import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetManyUserCommand } from '../commands/users/getManyUser.command';
import { UserController } from '../controllers/user.controller';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { GetConversationCommand } from '../commands/users/getConversation.command';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [UserController],
  providers: [GetManyUserCommand, GetConversationCommand],
  exports: [GetManyUserCommand],
})
export class UserModule {}
