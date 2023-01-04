import { IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
