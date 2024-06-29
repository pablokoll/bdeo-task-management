import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  TO_DO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.TO_DO })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
