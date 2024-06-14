import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SingInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInResponse } from '../common/types/sing-in-response';
import { RefreshResponse } from '../common/types/refresh-response';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sing in',
    description:
      'Sign to API using email and password and generates an access and refresh JWT.',
  })
  signIn(@Body() signInDto: SingInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Generates a new access JWT using a valid refresh JWT.',
  })
  refresh(@Body() refreshDto: RefreshTokenDto): Promise<RefreshResponse> {
    return this.authService.refresh(refreshDto);
  }
}
