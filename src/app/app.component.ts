import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName: string = "";
  response: any;

  constructor(private http: HttpClient) {

  }

  search() {
    this.http.get('https://aqueous-waters-16302.herokuapp.com/projects')
      .subscribe(response => {
        this.response = response;
        console.log(this.response);
      })
  }
}
