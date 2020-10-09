import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private tempArray = [];
  private trustedUrl: SafeResourceUrl;


  constructor(
    public httpServe: HttpService,
    private socket: SocketService,
    private sanitize: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.socket.getImages();

    this.socket.gotImages().subscribe(data => {
      console.log("Data ->", data);

      this.httpServe.imageArr.push(data);
    });
  }

  private mergeArrays(arrays) {
    let result = [];
    arrays.forEach(array => {
      result.push(...array);
    });
    return result;
  }

  private toBase64(uint8) {
    return btoa(String.fromCharCode.apply(null, uint8));
  }

}
