import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Document & Admin;

@Schema({ collection: 'tbl_admin', timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ required: false })
  accessToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
