import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResponseStatus } from '../models/response/base-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

//info update çalışıyor kullanıcılar listesinden görebilirsiniz.
export class InfoComponent implements OnInit {
  constructor(
    private readonly apiService: ApiService,
     private router: Router,
     private authService: AuthService , 
    private messageService: MessageService,) 

    {this.currentUser = null;}

  selectedGender: string = '';

  currentUser: User | null;
  users: User[] = [];

  currentContent: string = 'home';
  sidebarVisible2: boolean = false;
 
  isEditing: boolean = true;

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

  modalOpenAdd: boolean = false;
  modalOpen: boolean = false; //sayfa ilk açıldığında modal'ın kapalı kalması için false değer verdik
  modalEdit: boolean = false ;

  toggleEditing() {
    this.isEditing = !this.isEditing;
    this.changeContent('edit');

  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
  openModalAdd() {
    this.modalOpenAdd = true;
  }
  
  closeModalAdd() {
    this.modalOpenAdd = false;
  }
  editModal(){
    this.modalEdit = false;
  }

// belirli bir kullanıcıyı almak için API isteği yapar. başarılıysa düzenleme pencersi açar
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

  editDialog: boolean = false
  usersEdit: User | null = null;

    
  hideDialog() {
    this.editDialog = false;
  }

  closeEditModal() {
    this.editDialog = false;
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




  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
  }
}
