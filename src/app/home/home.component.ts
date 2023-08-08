import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
     private router: Router,
     private authService: AuthService) {
    this.currentUser = null;
  }

  users: User[] = [];

  currentContent: string = 'dashboard-home';
  sidebarVisible2: boolean = false;
  currentUser: User | null;

  ngOnInit(): void {
    this.refresh();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      console.log(this.users)
    });
  }

  changeContent(content: string) {
    this.currentContent = content;
  }

  isEditing: boolean = false;

  toggleEditing() {
    this.isEditing = !this.isEditing;
    this.changeContent('edit');

  }


  logOut(): void {
    // AuthService içindeki logout() metodunu çağırarak çıkış işlemini gerçekleştirin
    this.authService.logOut();
    this.router.navigate(['/login']); 

  }
}
