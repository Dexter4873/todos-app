import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Account {
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
  password: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
