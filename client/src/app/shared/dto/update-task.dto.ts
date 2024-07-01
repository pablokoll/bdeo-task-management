// src/app/dto/update-task.dto.ts
import { TaskStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  status?: TaskStatus;

  constructor(title: string = '', status?: TaskStatus) {
    super();
    this.title = title;
    this.status = status;
  }
}
