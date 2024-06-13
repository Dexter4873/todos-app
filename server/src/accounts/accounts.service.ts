import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
import { OkResponse, okResponse } from '../common/types/ok-response';
import { ResourceNotFoundError } from '../common/errors/resource-not-found-error';
import { hash } from 'bcrypt';
import { SALT_ROUNDS } from '../common/constants';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    await this.validateEmailUnique(createAccountDto.email);
    createAccountDto.password = await hash(createAccountDto.password, SALT_ROUNDS);
    return this.accountModel.create(createAccountDto);
  }

  findAll(): Promise<Account[]> {
    return this.accountModel.find({});
  }

  async findOne(id: string) {
    const account = await this.accountModel.findOne({ _id: id });
    if (!account) throw new ResourceNotFoundError('Account', id);
    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    if (updateAccountDto.email)
      await this.validateEmailUnique(updateAccountDto.email);
    const res = await this.accountModel.updateOne(
      { _id: id },
      { $set: updateAccountDto },
    );
    if (!res.modifiedCount) throw new ResourceNotFoundError('Account', id);
    return this.accountModel.findOne({ _id: id });
  }

  async remove(id: string): Promise<OkResponse> {
    const res = await this.accountModel.deleteOne({ _id: id });
    if (!res.deletedCount) throw new ResourceNotFoundError('Account', id);
    return okResponse;
  }

  private async validateEmailUnique(email: string): Promise<void> {
    const account = await this.accountModel.findOne({ email });
    if (account) throw new BadRequestException(`Email already exists`);
  }
}
