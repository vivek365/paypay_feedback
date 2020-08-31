import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      // { path: '', redirectTo: 'admin' },
      { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'employee', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }