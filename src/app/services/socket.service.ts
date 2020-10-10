import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  getMedia(media) {
    this.socket.emit(media);
  }

  gotImages() {
    return this.socket.fromEvent("gotImages");
  }
}
