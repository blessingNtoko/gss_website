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
      msgObj['endpoint'] = 'contact';

      console.log('Message Object ->', msgObj)

      this.httpServe.postHttp(msgObj);
    } else {
      console.log('Please fill in all required parts of form')
    }
  }

}
