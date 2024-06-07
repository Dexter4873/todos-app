import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { NonEmptyBodyPipe } from '../pipes/non-empty-body.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Account } from './entities/account.entity';
import { OkResponse } from '../common/types/ok-response';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create account',
    description: 'Create account using unique email and encrypt password',
  })
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all accounts',
    description: 'Find all accounts and sort as an array',
  })
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find account',
    description: 'Fins one account by its unique id',
  })
  findOne(@Param('id') id: string): Promise<Account> {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update account',
    description: 'Update one account with its id',
  })
  update(
    @Param('id') id: string,
    @Body(NonEmptyBodyPipe) updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete account',
    description: 'Delete one account by its unique id',
  })
  remove(@Param('id') id: string): Promise<OkResponse> {
    return this.accountsService.remove(id);
  }
}
