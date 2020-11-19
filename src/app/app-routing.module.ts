import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(a => a.AdminModule),
  },
  {
    path: ':type', loadChildren: () => import('./pages/cms/cms.module').then(c => c.CmsModule),
  },
  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    data: {
      customLayout: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
