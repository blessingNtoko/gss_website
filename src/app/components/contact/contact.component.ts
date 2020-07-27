import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public email = '';
  public name = '';
  public message = '';

  constructor(
    private httpServe: HttpService
  ) { }

  ngOnInit(): void {
  }

  public submitMsg() {
    const msgObj = {};

    if (this.email) {
      msgObj['email'] = this.email
    } else {
      msgObj['email'] = 'Anonymous Email';
    }

    if (this.name && this.message) {
      msgObj['name'] = this.name;
      msgObj['message'] = this.message;
      msgObj['_id'] = this.getUID();

      console.log('Message Object ->', msgObj)

      let toJSON = JSON.stringify(msgObj);
      console.log('Message Object in JSON ->', toJSON)

      // let toBase64 = btoa(toJSON);

      let encrypted = this.encryptMsg(toJSON);
      console.log('Encrypted message ->', encrypted);
      this.httpServe.postHttp(encrypted);
    } else {
      console.log('Please fill in all required parts of form')
    }
  }

  private getUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private encryptMsg(msg) {
    return msg;
  }

}
