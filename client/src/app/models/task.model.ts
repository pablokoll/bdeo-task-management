import { TaskStatus } from "../shared/enum/task-status.enum";

export class Task{
    constructor(
      public _id: string,
      public title: string,
      public description: string,
      public status: TaskStatus,
      public __v: number,
    ){}
  }