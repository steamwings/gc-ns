import { NgModule } from '@angular/core';

import {  MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [ modules ],
  exports: [ modules ]
})
export class MaterialModule { }
