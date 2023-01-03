import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetManyUserCommand } from '../commands/users/getManyUser.command';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [GetManyUserCommand],
  exports: [GetManyUserCommand],
})
export class UserModule {}
