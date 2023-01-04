import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserCommand } from '../commands/auth/loginUser.command';
import { GetUserCommand } from '../commands/users/getUser.command';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [LoginUserCommand, GetUserCommand, JwtStrategy],
  exports: [LoginUserCommand],
})
export class AuthModule {}
