import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmsComponent } from './cms.component';

const routes: Routes = [{ path: '', component: CmsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }