import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private gotImages = false;

  constructor(
    private httpServe: HttpService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {

    this.httpServe.imageArr = [];
    console.log(this.httpServe.imageArr);

  }

}
