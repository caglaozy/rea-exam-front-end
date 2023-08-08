import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResponseStatus } from '../models/response/base-response.model';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [MessageService]

})
export class UserListComponent implements OnInit {
  currentContent: string = 'home';
  modalOpen: boolean = false;
  currentUser: User | null;
  users:User[] = []
  submitted: boolean = false;
  productDialog: boolean = false;

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  )
    {
    this.currentUser = null;
  }

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
    });
    console.log(this.users)

  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
}


  ngOnInit(): void {
    this.refresh();
  }

  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarı ile silindi', life: 3000 });
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, User);

  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  //güncelleme
  editDialog: boolean = false
  usersEdit: User | null = null;

  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
  }

  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'ilan güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('ilan güncellenirken bir hata oluştu:', error);
    });
  }

  hideDialog() {
    this.editDialog = false;
  }

  closeEditModal() {
    this.editDialog = false;
  }
  openEditDialog(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      console.log(response?.data)
      if (response && response.data) {
        this.editDialog = true;
        this.usersEdit = response.data;
      } else {
        console.error('İlan bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('İlan alınırken bir hata oluştu:', error);
    });
  }


}
