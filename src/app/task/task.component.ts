import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../services/ProjectData.service';
import { Todo } from '../shared/models/todo.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ProjectsService],
})


export class TaskComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private ProjectData: ProjectsService) {
    this.todo = {
      id: 1,
      isCompleted: false,
      project_id: 1,
      text: '',
    };
  }

  ngOnInit(): void {}

  patchTodo(project_id: number, todo_id: number) {
    this.ProjectData.patch(project_id, todo_id).subscribe((data: any) => {});
  }
}
