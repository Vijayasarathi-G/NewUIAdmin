import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForbiddenComponent} from './forbidden.component';


const routes: Routes = [ {path: 'forbidden', component: ForbiddenComponent} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForbiddenRoutingModule { }
