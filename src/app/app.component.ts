import {
  Component,
  OnInit,
  PipeTransform,
  ViewEncapsulation,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { FormComponent } from './form/form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService, Project } from './services/ProjectData.service';
import { Pipe } from '@angular/core';

// export interface Card {
//   title: string;
//   text: string;
//   textColor: string;
// }

@Pipe({
  name: 'sort',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any): any {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      return a['id'] - b['id'];
    });
    return array;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProjectsService],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
  sendData: any;
  projects: Array<Project>;
  selected: string | number = '';
  projectForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private ProjectData: ProjectsService,
    private fb: FormBuilder
  ) {
    this.projects = [];

    this.projectForm = this.fb.group({
      task_text: [''],
      project_id: [1],
      project_name: [''],
    });
  }

  ngOnInit() {
    this.ProjectData.getData().subscribe((data: Array<Project>) => {
      this.projects = data;
      this.selected = data[0].id;
    });
  }

  openDialog() {
    this.dialog.open(FormComponent, {
      data: {
        projects: this.projects,
        selected: this.selected,
        projectForm: this.projectForm,
        postNewTask: () => {
          this.postNewTask();
        },
      },
    });
  }

  // patchTodo(project_id: number, todo_id: number) {
  //   this.ProjectData.patch(project_id, todo_id).subscribe((data: any) => {
  //     console.log('done');
  //   });
  // }

  postNewTask() {
    this.sendData = this.projectForm.value;
    if (this.sendData.task_text) {
      this.ProjectData.postData(this.sendData).subscribe(() => {
        this.ProjectData.getData().subscribe((data: Array<Project>) => {
          this.projects = data;
          if (this.sendData.project_name) {
            this.projectForm.reset({
              project_id: this.projects.length,
            });
            this.selected = this.projects.length;
          }
        });
        this.dialog.closeAll();
      });
    }
  }
}
