import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../accounts/entities/account.entity';
import { Model } from 'mongoose';
import { ResourceNotFoundError } from '../common/errors/resource-not-found-error';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from './dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponse } from '../common/types/refresh-response';
import { SignInResponse } from '../common/types/sing-in-response';

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get('jwtSecretAccess');
    this.refreshSecret = this.configService.get('jwtSecretRefresh');
  }

  async signIn({ email, password }: SingInDto): Promise<SignInResponse> {
    // Check account whit email exists
    const account = await this.accountModel.findOne(
      { email },
      {
        password: 1,
        email: 1,
      },
    );
    if (!account) throw new ResourceNotFoundError('Account', email, 'email');

    // Validate password
    const validPassword = await compare(password, account.password);
    if (!validPassword) throw new UnauthorizedException();

    // Create payload
    const payload = {
      email: account.email,
      id: account._id,
    };

    // Sign access token
    const access = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: this.accessSecret,
    });

    // Sign refresh token
    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: '4w',
      secret: this.refreshSecret,
    });

    return {
      access,
      refresh,
    };
  }

  async refresh({ refresh }: RefreshTokenDto): Promise<RefreshResponse> {
    try {
      // Validate refresh token
      const payload = await this.jwtService.verifyAsync(refresh, {
        secret: this.refreshSecret,
      });

      // Sign a new access token
      const access = await this.jwtService.signAsync(payload, {
        secret: this.accessSecret,
      });

      return { access };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
