import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
import { IOkResponse } from '../common/types/ok-response.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    await this.validateEmailUnique(createAccountDto.email);
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.find({});
  }

  findOne(id: string) {
    return this.accountModel.findOne({ _id: id });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    if (updateAccountDto.email)
      await this.validateEmailUnique(updateAccountDto.email);
    const res = await this.accountModel.updateOne(
      { _id: id },
      { $set: updateAccountDto },
    );
    if (!res.modifiedCount)
      throw new BadRequestException(`Account with id: ${id} not found`);
    return this.accountModel.findOne({ _id: id });
  }

  async remove(id: string): Promise<IOkResponse> {
    const res = await this.accountModel.deleteOne({ _id: id });
    if (!res.deletedCount)
      throw new BadRequestException(`Account with id: ${id} not found`);
    return { ok: 1 };
  }

  private async validateEmailUnique(email: string): Promise<void> {
    const account = await this.accountModel.findOne({ email });
    if (account) throw new BadRequestException(`Email already exists`);
  }
}
