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
  private tempArray = [];


  constructor(
    private httpServe: HttpService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.socket.getImages();

    this.socket.gotImages().subscribe(data => {
      console.log("from socket ->", typeof(data));

      if (typeof(data) === "string") {
        let result = this.mergeArrays(this.tempArray);
        console.log("Result ->", result);
      } else {
        let temp: any = data;

        let uint8 = new Uint8Array(temp);
        this.tempArray.push(uint8);
      }


      // this.httpServe.imageArr.push(data);
    });
  }

  private mergeArrays(arrays) {
    let result = [];
    arrays.forEach(array => {
      result.push(...array);
    });
    return result;
  }

}
