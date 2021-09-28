import { Component,  Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ProjectsService } from '../services/ProjectData.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ProjectsService]
})
export class FormComponent  {
  sendData: any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ProjectData: ProjectsService, public dialog: MatDialog,) {}

  postNewTask() {
    console.log(this.data.projects)
    this.sendData = this.data.projectForm.value;
    if (this.sendData.task_text) {
      console.log(this.sendData)
      this.ProjectData.postData(this.sendData).subscribe((data:any) => {
        console.log('data',data);


        if(this.sendData.project_id){
          this.data.projects[data.project_id - 1].todos.push({id: data.id, isCompleted: false, project_id: data.project_id, text: data.text });
          this.data.projectForm.reset({
                  project_id: data.project_id,
                });
          

        } else if(this.sendData.project_name){
         
          this.data.projects.push({id: data.todo.project_id, title: data.category_title, todos: [data.todo]});
          this.data.projectForm.reset({
            project_id: data.todo.project_id,
          });
        }
        this.dialog.closeAll();
      }
      );
    }
    
  }

}



