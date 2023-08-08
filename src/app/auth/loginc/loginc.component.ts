import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginRequest } from 'src/app/models/request/login-request.model';
import { ResponseStatus } from 'src/app/models/response/base-response.model';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-loginc',
  templateUrl: './loginc.component.html',
  styleUrls: ['./loginc.component.css']
})
export class LogincComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}
  public loginRequest: LoginRequest = <LoginRequest>{};


  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status === ResponseStatus.Ok) {
      await this.router.navigate(['']);
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Giriş yaptınız..' });
        this.router.navigate(['/home']); // Giriş doğruysa /homepage'e yönlendir
      }, 2000); // 2 saniye (2000 milisaniye) beklet
    } else if (status === ResponseStatus.Invalid) {
      this.loginRequest.Password = '';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı adı veya şifre hatalı' });
    }
  }
}
