import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // AuthGuard yolunu düzgün şekilde ayarlayın
import { LogincComponent } from './auth/loginc/loginc.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: LogincComponent },


  // canActivate: [AuthGuard]
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
