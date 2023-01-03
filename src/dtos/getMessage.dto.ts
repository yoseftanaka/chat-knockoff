import { IsNotEmpty } from 'class-validator';

export class GetMessageRequest {
  @IsNotEmpty()
  viewerId: string;

  @IsNotEmpty()
  searchedUserId: string;
}

export class GetMessageResponse {
  data: { text: string }[];
}
