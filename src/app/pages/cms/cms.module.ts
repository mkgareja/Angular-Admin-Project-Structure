import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { CKEditorModule } from 'ckeditor4-angular';
import { CmsComponent } from './cms.component';

@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UtilityService
  ]
})
export class CmsModule { }