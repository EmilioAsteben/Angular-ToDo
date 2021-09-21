import { Component,  Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}


}
