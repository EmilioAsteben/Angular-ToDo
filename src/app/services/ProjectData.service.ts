import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export type Todo = {
  id: number,
  isCompleted: boolean;
  project_id: number;
  text: string;
};

export interface Project {
  id: number;
  title: string;
  todos: Todo[];
}

export interface Task {
  project_id: number;
  project_name: string;
  text: string;
}

@Injectable()
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Project[]>(
      environment.geturl()
    );
  }

  patch(project_id: number, todo_id: number) {
    return this.http.patch(
      environment.patchUrl(project_id,todo_id),
      null
    );
  }

  postData(newTask: Task) {
    return this.http.post(
      environment.postUrl(),
      newTask
    );
  }
}
