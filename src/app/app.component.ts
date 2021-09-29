import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormComponent } from './form/form.component';

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

  constructor(
    public dialog: MatDialog,
    private ProjectData: ProjectsService,
   
  ) {
    this.projects = [];

  }

  identify(index:number, item: any){
    return item.id
  }

  ngOnInit() {
    this.ProjectData.getData().subscribe((data: Array<Project>) => {
      this.projects = data;
      console.log(this.projects)
    });
  }

  openDialog() {
    this.dialog.open(FormComponent, {
      data: {
        projects: this.projects,
 
      },
    });
  }

}

