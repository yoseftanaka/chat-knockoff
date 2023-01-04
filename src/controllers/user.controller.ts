import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GetConversationCommand } from '../commands/users/getConversation.command';
import { RegisterUserRequest } from '../dtos/registerUser.dto';
import { CreateUserCommand } from '../commands/users/createUser.command';
import { LoginUserCommand } from '../commands/auth/loginUser.command';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginUserRequest } from '../dtos/loginUser.dto';

@Controller('users')
export class UserController {
  constructor(
    private getConversationCommand: GetConversationCommand,
    private createUserCommand: CreateUserCommand,
    private loginCommand: LoginUserCommand,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/involved-conversation')
  public async listInvolvedConversation(
    @Query('viewerId') viewerId: string,
  ): Promise<any> {
    return this.getConversationCommand.listInvolvedConversation(viewerId);
  }

  @Post('register')
  public async registerUser(@Body() body: RegisterUserRequest): Promise<void> {
    return this.createUserCommand.createNewUser(body);
  }

  @Post('login')
  public async login(@Body() body: LoginUserRequest) {
    return this.loginCommand.login(body);
  }
}
