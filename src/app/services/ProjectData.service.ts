import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Todo = {
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
      'https://intense-taiga-29233.herokuapp.com/projects'
    );
  }

  patch(project_id: number, todo_id: number) {
    return this.http.patch(
      `https://intense-taiga-29233.herokuapp.com/projects/${project_id}/todo/${todo_id}`,
      null
    );
  }

  postData(newTask: Task) {
    return this.http.post(
      'https://intense-taiga-29233.herokuapp.com/todos',
      newTask
    );
  }
}
