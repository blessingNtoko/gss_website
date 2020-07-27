import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3000/contact';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public postHttp(data) {
    console.log('Data to post ->', data);
    let temp = {
      type: 'Message',
      data: data
    }
    return this.http.post(this.url, temp, this.httpOptions).subscribe(data => {
      console.log('Subscribe ->', data);
    });
  }
}
