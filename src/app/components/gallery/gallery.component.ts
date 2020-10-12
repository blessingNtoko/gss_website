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
    // this.socket.getMedia("audio");
    this.socket.getMedia("video");

    this.socket.gotImages().subscribe(data => {
      console.log("Data ->", data);

      this.httpServe.imageArr.push(data);
    });

    this.socket.gotAudio().subscribe(data => {
      let temp: any = data;

      if (temp["uid"]) {
        if (temp["uid"] === this.socket.audioUID) {
          console.log("this.socket.audioUID ->", this.socket.audioUID);

          if (temp["files"]) {
            this.socket.getMedia("audio", temp["files"][1]);
          }

          if (temp["data"]) {
            console.log("Audio data ->", temp);
            // const myVid: any = document.getElementById("myVid");
            // const mediaSource = new MediaSource();

            // const url = URL.createObjectURL(mediaSource);
            // myVid.src = url;

            // const sourceBuff = mediaSource.addSourceBuffer('video/mp4; codec="avc1.64001e"');
            // sourceBuff.appendBuffer(temp["data"]);
          }
        }
      }

    });

    this.socket.gotVideo().subscribe(data => {
      let temp: any = data;

      if (temp["uid"]) {
        if (temp["uid"] === this.socket.videoUID) {
          console.log("this.socket.videoUID ->", this.socket.videoUID);

          if (temp["files"]) {
            this.socket.getMedia("video", temp["files"][0]);
          }

          if (temp["data"]) {
            console.log("Video data ->", temp);
          }
        }
      }
    });
  }

  // private mergeArrays(arrays) {
  //   let result = [];
  //   arrays.forEach(array => {
  //     result.push(...array);
  //   });
  //   return result;
  // }

}
