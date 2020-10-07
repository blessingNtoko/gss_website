import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  getImages() {
    this.socket.emit("imagesPls");
  }

  gotImages() {
    return this.socket.fromEvent("gotImages");
  }
}
