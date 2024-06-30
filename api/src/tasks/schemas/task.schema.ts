import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  'TO-DO' = 'to-do',
  'IN-PROGRESS' = 'in-progress',
  DONE = 'done',
}

@Schema()
export class Task extends PartialType(Document) {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus['TO-DO'] })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
