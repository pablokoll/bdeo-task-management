import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  'TO-DO' = 'to-do',
  'IN-PROGRESS' = 'in-progress',
  DONE = 'done',
}

@Schema()
export class Task extends PartialType(Document) {
  @ApiProperty({
    example: 'Task title',
    description: 'The title of the task',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'A detailed description of the task',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 'to-do',
    enum: TaskStatus,
    description: 'The status of the task',
    default: TaskStatus['TO-DO'],
  })
  @Prop({ required: true, enum: TaskStatus, default: TaskStatus['TO-DO'] })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
