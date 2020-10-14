import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  constructor(
    private socket: Socket
  ) { }

  public getMedia(media: string) {
    let mediaObj = {};

      mediaObj["uid"] = this.getUID();
      console.log('Media Obj without clip ->', mediaObj);

      this.socket.emit(media, mediaObj);

  }

  public gotImages() {
    return this.socket.fromEvent("images");
  }

  private getUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
