import { Controller, Get } from '@nestjs/common';
import { IApiInfo } from './common/types/api-info.interface';
import { API_DESCRIPTION, API_TITLE, API_VERSION } from './common/constants';

@Controller()
export class AppController {
  @Get()
  getApiInfo(): IApiInfo {
    return {
      title: API_TITLE,
      description: API_DESCRIPTION,
      version: API_VERSION,
    };
  }
}
