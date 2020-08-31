import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAlreadyLoggedinService } from './common/service/is-already-loggedin.service';
import { AuthGuardService } from './common/service/auth-guard.service';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [IsAlreadyLoggedinService]
  },
  {
    path: 'app', loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
