import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public todoList: any;
  public modalIsOpen: boolean = false;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.updateTodos()
  }

  updateTodos() {
    this.http.get('https://aqueous-waters-16302.herokuapp.com/projects')
      .subscribe(todoList => {
        this.todoList = todoList
        console.log(todoList);
      })
  }

  openModal(event: boolean) {
    this.modalIsOpen = event
  }
   
  closeModal(event: boolean) {
      this.modalIsOpen = event
  }
}
