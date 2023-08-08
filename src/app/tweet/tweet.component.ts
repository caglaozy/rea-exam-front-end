import { Component , OnInit, Renderer2 } from '@angular/core';
import { Tweet } from '../models/tweet.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TweetRequest } from '../models/request/tweet-request.model';
import { ResponseStatus } from '../models/response/base-response.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api/api.service';



@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit { 
    productDialog: boolean = false;


    submitted: boolean = false;

    statuses!: any[];

    searchValue: string = '';

    tweets: Tweet[]=[];

   selectedtweet: Tweet = new Tweet();
   selectedTweetIds: number[] = []; // Seçili ilanların ID'lerini saklayacağımız dizi


    modalOpenAdd: boolean = false;
    modalOpen: boolean = false; //sayfa ilk açıldığında modal'ın kapalı kalması için false değer verdik
    modalEdit: boolean = false ;

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


    value: string | undefined;

    situationOptions = [
      { label: 'İlanda', value: true },
      { label: 'İlanda değil', value: false }
    ];


    constructor(

        private readonly apiService: ApiService, 
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private renderer: Renderer2
        ) {}
        public tweetRequest: TweetRequest = <TweetRequest>{};

    ngOnInit(): void {
        this.refresh();
    }


    //tüm verileri listeleme
    refresh() {
        this.apiService.getAllEntities(Tweet).subscribe((response) => {
          this.tweets = response.data;
          console.log(this.tweets)
        });    
      }

   


    //silme
    onDelete(tweetId: number) {
      console.log("Silme işlemi için ID:", tweetId);
      
      this.delete(tweetId)
        .then(response => {
          console.log("Silme yanıtı:", response);
          
          if (response?.status == ResponseStatus.Ok) {
            console.log("Silme işlemi başarılı, tablo yenileniyor.");
            this.refresh();
          } else {
            console.log("Silme işlemi başarısız.");
          }
        })
        .catch(error => {
          console.error("Silme işlemi sırasında bir hata oluştu:", error);
        }); 
    }
   
 
    delete(tweetId: number) {
      return this.apiService.deleteEntity(tweetId, Tweet);
    }
    
    



    // tweet ekleme
    onCreate(entity: TweetRequest) {
      this.addEntity<TweetRequest>(entity, 'Tweet').then(response => {
        if (response?.status == ResponseStatus.Ok) {
          this.modalOpenAdd = false;
          this.refresh();
        }
      });
    }




  
    



    addEntity<TEntity>(entity: TEntity, entityType:  string) {
      return this.apiService.addEntity<TEntity>(entity, entityType);
    }




    //güncelleme  
    editDialog: boolean = false
    tweetsEdit: Tweet | null = null;
  
      
    hideDialog() {
      this.editDialog = false;
    }
  
    closeEditModal() {
      this.editDialog = false;
    }

  
    
    openEditDialog(id: number) {
      this.apiService.getEntityById<Tweet>(id, Tweet).then((response) => {
        console.log(response?.data)
        if (response && response.data) {
          this.editDialog = true;          // Modalı aç
          this.tweetsEdit = response.data; // Düzenleme için tweet bilgilerini ata
        } else {
          console.error('Tweet bulunamadı veya alınırken bir hata oluştu.');
        }
      }).catch((error) => {
        console.error('Tweet alınırken bir hata oluştu:', error);
      });
    }
    
    
 

    onUpdate(id: number, updatedTweet: Tweet) {
      this.update(id, updatedTweet).then(response => {
        if (response?.status == ResponseStatus.Ok) {
          this.refresh();
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'ilan güncelleme başarılı', life: 3000 });
          this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
        }
      }).catch((error) => {
        console.error('ilan güncellenirken bir hata oluştu:', error);
      });
    }
  
  
    update(id: number, updatedTweet: Tweet) {
      return this.apiService.updateEntity(id, updatedTweet, Tweet);
    }
  }