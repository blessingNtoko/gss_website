import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public imageArr = [];

  private url = 'http://localhost:3000/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public postHttp(data) {
    console.log('Data to post ->', data);
    let temp = {
      email: data['email'],
      name: data['name'],
      message: data['message']
    }

    let toJSON = JSON.stringify(temp);
    console.log('Message Object in JSON ->', toJSON)

    let toBase64 = btoa(toJSON);

    let encrypted = this.encryptMsg(toBase64);
    console.log('Encrypted message ->', encrypted);

    let tempObj = {
      type: 'message',
      data: encrypted,
      _id: this.getUID()
    }

    return this.http.post(this.url + data['endpoint'], tempObj, this.httpOptions).subscribe(data => {
      console.log('Subscribe ->', data);
    });
  }

  public getHttp(media: string) {
    return this.http.get(this.url + 'media/' + media, {
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  private getUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private encryptMsg(msg) {
    return msg;
  }
}
