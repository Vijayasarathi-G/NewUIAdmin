import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { FileComponent } from './file.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';



@NgModule({
  declarations: [UploadComponent, DownloadComponent, FileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class FileModule { }
