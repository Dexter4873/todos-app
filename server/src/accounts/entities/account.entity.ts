import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Schema()
export class Account {
  @ApiProperty()
  id: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  @ApiHideProperty()
  password: string;

  @Prop()
  name?: string;

  @Prop()
  lastname?: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
