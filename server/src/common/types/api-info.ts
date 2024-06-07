import { API_DESCRIPTION, API_TITLE, API_VERSION } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class ApiInfo {
  @ApiProperty()
  title: string = API_TITLE;

  @ApiProperty()
  description: string = API_DESCRIPTION;

  @ApiProperty()
  version: number = API_VERSION;
}

export const apiInfo = new ApiInfo();
