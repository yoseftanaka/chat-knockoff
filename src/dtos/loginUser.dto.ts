import { IsNotEmpty } from 'class-validator';

export class LoginUserRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
