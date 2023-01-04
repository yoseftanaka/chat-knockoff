import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserCommand } from '../users/getUser.command';
import * as bcrypt from 'bcrypt';
import { LoginUserRequest } from '../../dtos/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class LoginUserCommand {
  constructor(
    private jwtService: JwtService,
    private getUserCommand: GetUserCommand,
  ) {}

  public async login(body: LoginUserRequest): Promise<any> {
    const user = await this.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getUserCommand.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
