import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../services/ProjectData.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ProjectsService]
})
export class TaskComponent implements OnInit {

  @Input() todo  = {
    id: 1,
    isCompleted: true,
    project_id: 1,
    text: 'qwerty'
  };

  constructor(private ProjectData: ProjectsService,) {

   }

  ngOnInit(): void {
  }

 

  patchTodo(project_id: number, todo_id: number) {
    this.ProjectData.patch(project_id, todo_id).subscribe((data: any) => {
    });
  }

}
