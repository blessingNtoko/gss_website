import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private uid: any;

  constructor(
    private socket: Socket
  ) { }

  getMedia(media: string, clip?: string) {
    let mediaObj = {};
    this.uid = this.getUID();
    mediaObj["uid"] = this.uid;

    if (clip) {

      console.log("Clip ->", clip);
      console.log("UID ->", this.uid);

      mediaObj["data"] = clip;

      this.socket.emit(media, mediaObj);
    }
    console.log('Media Obj without clip ->', mediaObj);

    this.socket.emit(media, mediaObj);
  }

  gotImages() {
    return this.socket.fromEvent("images");
  }

  gotAudio() {
    return this.socket.fromEvent("audioChunk");
  }

  gotVideo() {
    return this.socket.fromEvent("videoChunk");
  }

  private getUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
