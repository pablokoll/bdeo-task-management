import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  'TO-DO' = 'to-do',
  'IN-PROGRESS' = 'in-progress',
  DONE = 'done',
}

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus['TO-DO'] })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
