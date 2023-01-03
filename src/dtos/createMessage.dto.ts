import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidationArguments,
} from 'class-validator';

export class CreateMessageRequest {
  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: (args: ValidationArguments) => {
      if (args.value.length < 1) {
        return 'Too short, minimum length is 1 character';
      }
    },
  })
  text: string;
}
