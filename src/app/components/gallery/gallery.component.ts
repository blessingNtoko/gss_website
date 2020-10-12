import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  private bufferSize = 12;
  private vidArray = [];

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


          }
        }
      }

    });

    this.socket.gotVideo().subscribe(data => {
      try {

        let temp: any = data;

        if (temp["uid"]) {
          if (temp["uid"] === this.socket.videoUID) {
            console.log("this.socket.videoUID ->", this.socket.videoUID);

            if (temp["files"]) {
              this.socket.getMedia("video", temp["files"][0]);
            }
            try {

              if (temp["data"]) {
                console.log("Video data ->", temp);
                const myVid: any = document.getElementById("myVid");
                const mediaSource = new MediaSource();
                let tempArray = [];
                tempArray.push(new Uint8Array(temp["data"]));

                myVid.src = URL.createObjectURL(mediaSource);

                if (tempArray.length > this.bufferSize) {
                  let result = this.mergeArrays(tempArray);
                  tempArray = [];
                  console.log("Temp array ->", tempArray);
                  this.vidArray.push(result);
                  console.log("Result array ->", this.vidArray);
                }

                // let uint8 = new Uint8Array(temp["data"]);
                // mediaSource.addEventListener("sourceopen", () => {
                //   const sourceBuff = mediaSource.addSourceBuffer(this.mimeCodec);
                //   sourceBuff.mode = "sequence";

                //   sourceBuff.addEventListener("updateend", () => {
                //     // mediaSource.endOfStream();
                //     myVid.play();
                //   })
                //   sourceBuff.appendBuffer(temp["data"]);
                // });
              }
            } catch (error) {
              console.error("Error in media source or source buffer ->", error);
            }
          }
        }
      } catch (error) {
        console.error("Error in subscribe ->", error);
      }
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
