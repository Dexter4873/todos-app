import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  access: string;

  @ApiProperty()
  refresh: string;
}
