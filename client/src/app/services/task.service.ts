import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../shared/dto/create-task.dto';
import { UpdateTaskDto } from '../shared/dto/update-task.dto';
import { TasksLists } from '../shared/types/tasks-lists.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
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

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, createTaskDto).pipe(
      tap((newTask) => {
        this.tasksSubject.next([...this.tasksSubject.value, newTask]);
      })
    );
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, updateTaskDto).pipe(
      tap((updateTask) => {
        const indexTask = this.tasksSubject.value.findIndex(
          (value) => value._id === id
        );
        this.tasksSubject.value[indexTask] = updateTask;
        this.tasksSubject.next(this.tasksSubject.value);
      })
    );
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url).pipe(
      tap(() => {
        const tasksFiltered = this.tasksSubject.value.filter(
          (value) => value._id !== id
        );
        this.tasksSubject.next(tasksFiltered);
      })
    );
  }
}
