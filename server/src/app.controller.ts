import { Controller, Get } from '@nestjs/common';
import { apiInfo, ApiInfo } from './common/types/api-info';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  @Get()
  @Public()
  @ApiOperation({
    summary: 'API info',
    description: 'Find API info used as a test endpoint',
  })
  getApiInfo(): ApiInfo {
    return apiInfo;
  }
}
