import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserCommand } from '../commands/users/getUser.command';
import { UserController } from '../controllers/user.controller';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { GetConversationCommand } from '../commands/users/getConversation.command';
import { CreateUserCommand } from '../commands/users/createUser.command';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message]), AuthModule],
  controllers: [UserController],
  providers: [GetUserCommand, GetConversationCommand, CreateUserCommand],
  exports: [GetUserCommand, GetConversationCommand, CreateUserCommand],
})
export class UserModule {}
