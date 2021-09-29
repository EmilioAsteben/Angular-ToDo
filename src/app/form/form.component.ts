import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../services/ProjectData.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ProjectsService],
})


export class FormComponent {
  selected: number | string = 1;
  sendData: any;
  projectForm: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ProjectData: ProjectsService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    
    this.projectForm = this.fb.group({
      task_text: ['', [Validators.required, Validators.minLength(4)]],
      project_id: [this.selected],
      project_name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get task_text() {
    return this.projectForm.get('task_text') as FormControl;
  }
  get project_name() {
    return this.projectForm.get('project_name') as FormControl;
  }

  postNewTask() {
   
    this.sendData = this.projectForm.value;
    if (this.sendData.task_text) {
      
      this.ProjectData.postData(this.sendData).subscribe((data: any) => {
        
        if (!data) {
          alert('Данные уже существуют в таблице');
          return;
        }

        if (this.sendData.project_id) {
          this.data.projects[data.project_id - 1].todos.push({
            id: data.id,
            isCompleted: false,
            project_id: data.project_id,
            text: data.text,
          });
          this.projectForm.reset({
            project_id: data.project_id,
          });
        } else if (this.sendData.project_name) {
          this.data.projects.push({
            id: data.todo.project_id,
            title: data.category_title,
            todos: [data.todo],
          });
          this.projectForm.reset({
            project_id: data.todo.project_id,
          });
        }
        this.dialog.closeAll();
      });
    }
  }

  restoreControl() {
    this.projectForm.addControl(
      'project_name',
      new FormControl('', [Validators.required, Validators.minLength(4)])
    );
  }

  onSubmit() {
    const controls = this.projectForm.controls;
    if (this.selected !== '') {
      this.projectForm.removeControl('project_name');
    }

    if (this.projectForm.invalid) {
      Object.keys(controls).forEach((controlName) => {
       
        controls[controlName].markAsTouched();
      });

      return;
    }

    this.postNewTask();
  }
}
