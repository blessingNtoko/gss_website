import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  getMedia(media: string, clip?: string) {
    if (clip) {
      console.log("Clip ->", clip);
      this.socket.emit(media, clip);
    }

    this.socket.emit(media);
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
}
