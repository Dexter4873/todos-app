import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { NonEmptyBodyPipe } from '../pipes/non-empty-body.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Account } from './entities/account.entity';
import { OkResponse } from '../common/types/ok-response';
import { Public } from 'src/decorators/public.decorator';
import { JwtPayload } from '../decorators/jwt-payload.decorator';
import { JwtPayloadData } from '../common/types/jwt-payload-data';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Create account',
    description: 'Create account using unique email and encrypt password',
  })
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Get('self')
  @ApiOperation({
    summary: 'Find self account',
    description: 'Finds account by its bearer token',
  })
  findSelf(@JwtPayload() user: JwtPayloadData): Promise<Account> {
    return this.accountsService.findOne(user.id);
  }

  @Patch('self')
  @ApiOperation({
    summary: 'Update self account',
    description: 'Update one account with its bearer token',
  })
  update(
    @JwtPayload() user: JwtPayloadData,
    @Body(NonEmptyBodyPipe) updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountsService.update(user.id, updateAccountDto);
  }

  @Delete('self')
  @ApiOperation({
    summary: 'Delete self account',
    description: 'Delete one account by its bearer token',
  })
  remove(@JwtPayload() user: JwtPayloadData): Promise<OkResponse> {
    return this.accountsService.remove(user.id);
  }
}
