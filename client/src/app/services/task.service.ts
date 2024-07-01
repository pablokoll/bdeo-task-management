import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TasksLists } from '../shared/types/tasks-lists';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  assignTasks(tasks: Task[]): TasksLists {
    const tasksLists: TasksLists = {
      'to-do': [],
      'in-progress': [],
      done: [],
    };
    for (const task of tasks) {
      tasksLists[task.status].push(task);
    }
    return tasksLists;
  }
}
