import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../shared/models/task.model';
import { Project } from '../shared/models/project.model';



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
