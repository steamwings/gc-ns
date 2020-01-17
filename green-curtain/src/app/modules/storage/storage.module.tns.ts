import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [],
  imports: [
    NativeScriptCommonModule
  ],
  exports: [
    StorageService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StorageModule { }
