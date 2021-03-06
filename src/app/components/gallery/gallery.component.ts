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
  private tempArray = [];

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
                try {
                  this.tempArray.push(new Uint8Array(temp["data"]));

                  if (this.tempArray.length > this.bufferSize) {
                    let result = this.mergeArrays(this.tempArray);
                    this.tempArray = [];
                    console.log("Temp array ->", this.tempArray);
                    this.vidArray.push(result);
                    console.log("Result array ->", this.vidArray);
                  }
                } catch (error) {
                  console.error("Error when merging or pushing merged arrays into variable ->", error);
                }
                const myVid: any = document.getElementById("myVid");
                const mediaSource = new MediaSource();

                myVid.src = URL.createObjectURL(mediaSource);

                mediaSource.addEventListener("sourceopen", () => {
                  const sourceBuff = mediaSource.addSourceBuffer(this.mimeCodec);
                  sourceBuff.mode = "segments";

                  sourceBuff.addEventListener("updateend", () => {
                    // mediaSource.endOfStream();
                    myVid.play();
                  });

                  if (mediaSource.readyState === "open" && sourceBuff && sourceBuff.updating === false && this.vidArray.length > 1) {
                    console.log("Appending To Source Buffer");
                    sourceBuff.appendBuffer(this.vidArray.shift());
                  }

                });
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
    try {

      let result = [];
      arrays.forEach(array => {
        result.push(...array);
      });
      return result;
    } catch (error) {
      console.error("Error when merging arrays ->", error);
    }
  }

}
