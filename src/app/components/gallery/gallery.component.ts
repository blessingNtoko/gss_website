import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public imgArray = [];

  constructor(
    private socket: SocketService,
  ) { }

  ngOnInit(): void {
    this.socket.getMedia("images");

    this.socket.gotImages().subscribe(data => {
      console.log("Data ->", data);

      this.imgArray.push(data);
    });

  }


}
