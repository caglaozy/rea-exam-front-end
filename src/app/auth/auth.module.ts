import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LogincComponent } from '../auth/loginc/loginc.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: '', component: LogincComponent },

];

@NgModule({
  declarations: [LogincComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    RadioButtonModule,
    PasswordModule,
    ToastModule,
    RouterModule.forChild(routes),

  ],
})
export class AuthModule {}
