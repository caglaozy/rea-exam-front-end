import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-exam';
  currentContent: string = 'user-list';  //bir dize (string) tipinde tanımlanır ve başlangıç değeri olarak 'home' atanır.

  changeContent(content: string) {  //bileşenin mevcut içeriğini değiştirmek için kullanılır. kullanıcı etkileşimine bağlı olarak içerik değiştirilebilir veya güncellenebilir.
    this.currentContent = content;
  }
}

