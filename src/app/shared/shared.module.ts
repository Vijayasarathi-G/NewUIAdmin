import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonTableComponent } from './common-table/common-table.component';
import {MaterialModule} from './material.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [CommonTableComponent],
  exports: [
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PerfectScrollbarModule,
    FlexModule
  ]
})
export class SharedModule { }
