import { Controller, Get } from '@nestjs/common';
import { apiInfo, ApiInfo } from './common/types/api-info';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'API info',
    description: 'Find API info used as a test endpoint',
  })
  getApiInfo(): ApiInfo {
    return apiInfo;
  }
}
