import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProfileDocument = Document & Profile;

@Schema({ collection: 'tbl_profile', timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'tbl_users', required: true })
  userId: string;

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

export const ProfileSchema = SchemaFactory.createForClass(Profile);
