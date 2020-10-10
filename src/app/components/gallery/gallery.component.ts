import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {


  constructor(
    public httpServe: HttpService,
    private socket: SocketService,
  ) { }

  ngOnInit(): void {
    // this.socket.getMedia("images");
    this.socket.getMedia("audio");
    // this.socket.getMedia("video");

    // this.socket.gotImages().subscribe(data => {
    //   console.log("Data ->", data);

    //   this.httpServe.imageArr.push(data);
    // });

    this.socket.gotAudio().subscribe(data => {
      let temp: any = data;

      if (temp["files"]) {
        if(temp["data"]) {
          console.log("Both files and data are present");
          console.log("Audio data ->", temp);
        } else {
          this.socket.getMedia("audio", temp["files"][0]);
        }
      }

      console.log("audio data ->", temp);
      console.log("this.socket.audioUID ->", this.socket.audioUID);
    });

    this.socket.gotVideo().subscribe(data => {
      console.log("video data ->", data);
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
