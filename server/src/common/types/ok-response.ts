import { ApiProperty } from '@nestjs/swagger';

export class OkResponse {
  @ApiProperty({
    example: 1,
  })
  ok: number = 1;
}

export const okResponse = new OkResponse();
