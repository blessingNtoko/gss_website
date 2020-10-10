import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public imageUID: any;
  public audioUID: any;
  public videoUID: any;

  constructor(
    private socket: Socket
  ) { }

  public getMedia(media: string, clip?: string) {
    let mediaObj = {};

    if (clip) {
      console.log("Clip ->", clip);

      mediaObj["data"] = clip;

      mediaObj["uid"] = this.mediaCheck(media);
      console.log('Media Obj with clip ->', mediaObj);

      this.socket.emit(media, mediaObj);
    } else {
      mediaObj["uid"] = this.mediaCheck(media);
      console.log('Media Obj without clip ->', mediaObj);

      this.socket.emit(media, mediaObj);
    }
  }

  public gotImages() {
    return this.socket.fromEvent("images");
  }

  public gotAudio() {
    return this.socket.fromEvent("audioChunk");
  }

  public gotVideo() {
    return this.socket.fromEvent("videoChunk");
  }

  private mediaCheck(media) {
    if (media === "images") {
      this.imageUID = this.getUID();
      console.log("imageUID ->", this.imageUID);

      return this.imageUID;
    } else if (media === "audio") {
      this.audioUID = this.getUID();
      console.log("audioUID ->", this.audioUID);

      return this.audioUID;
    } else if (media === "video") {
      this.videoUID = this.getUID();
      console.log("videoUID ->", this.videoUID);

      return this.videoUID;
    }
  }

  private getUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
