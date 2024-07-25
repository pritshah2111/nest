import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Document & Users;

@Schema({ collection: 'tbl_user', timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  accessToken: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
