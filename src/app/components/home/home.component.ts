import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpServe: HttpService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {

    this.socket.getImages();
    this.socket.gotImages().subscribe(data => {
      console.log("from socket ->", data);

      this.httpServe.imageArr.push(data);
    });

  }

}
