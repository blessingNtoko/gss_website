import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private gotImages = false;


  constructor(
    private socket: SocketService
  ) { }

  ngOnInit(): void {
  //   if (!this.gotImages) {
  //     this.socket.gotImages().subscribe(data => {
  //       console.log("from socket ->", data);
  //       this.gotImages = true;
  //       this.httpServe.imageArr.push(data);
  //     });
  //   }
  // }

}
