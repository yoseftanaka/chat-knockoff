import {
  IsAlphanumeric,
  IsNotEmpty,
  MinLength,
  ValidationArguments,
} from 'class-validator';

export class CreateMessageRequest {
  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(1, {
    message: (args: ValidationArguments) => {
      if (args.value.length < 1) {
        return 'Too short, minimum length is 1 character';
      }
    },
  })
  text: string;
}
