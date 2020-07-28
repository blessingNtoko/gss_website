import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public imageArr;

  constructor(
    private httpServe: HttpService
  ) { }

  ngOnInit(): void {
    try {
      this.httpServe.getHttp('images').subscribe(data => {
        console.log('Subscribe in gallery ->', data);

        this.imageArr = JSON.parse(data['body']);
        console.log(this.imageArr);
      });
    } catch (error) {
      console.log('Error on Init ->', error);
    }
  }

}
