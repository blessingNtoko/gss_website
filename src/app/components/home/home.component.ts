import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpServe: HttpService
  ) { }

  ngOnInit(): void {

    try {
      this.httpServe.getHttp('images').subscribe(data => {
        console.log('Subscribe in gallery ->', data);

        this.httpServe.imageArr = JSON.parse(data['body']);
        console.log(this.httpServe.imageArr);
      });
    } catch (error) {
      console.log('Error on Init ->', error);
    }
  }

}
