import {
  Component,
  OnInit,
  PipeTransform,
  ViewEncapsulation,
} from '@angular/core';

import { FormComponent } from './form/form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from './services/ProjectData.service';

import { Project } from './shared/models/project.model';






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

  identify(index:number, item: any){
    return item.id
  }

  ngOnInit() {
    this.ProjectData.getData().subscribe((data: Array<Project>) => {
      this.projects = data;
      console.log(this.projects);
      this.selected = data[0].id;
    });
  }

  openDialog() {
    this.dialog.open(FormComponent, {
      data: {
        projects: this.projects,
        selected: this.selected,
        projectForm: this.projectForm,
        // postNewTask: () => {
        //   // this.postNewTask();
        // },
      },
    });
  }

}

