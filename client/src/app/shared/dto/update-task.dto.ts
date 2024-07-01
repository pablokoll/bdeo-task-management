// src/app/dto/update-task.dto.ts
import { TaskStatus } from '../enum/task-status.enum';

export class UpdateTaskDto {
  constructor(public title?: string, public status?: TaskStatus) {
    this.title = title;
    this.status = status;
  }
}
