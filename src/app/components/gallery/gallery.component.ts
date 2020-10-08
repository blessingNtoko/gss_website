import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private gotImages = false;
  private tempArray = [];


  constructor(
    public httpServe: HttpService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.socket.getImages();

    this.socket.gotImages().subscribe(data => {
      // console.log("from socket ->", typeof (data));
      let reader = new FileReader();

      if (typeof (data) === "string") {
        let result = this.mergeArrays(this.tempArray);

        let resultBlob = new Blob(result, { type: "image/png" });
        console.log("Blob ->", resultBlob);
        // let blobURL = URL.createObjectURL(resultBlob);

        // let newImage = new Image();
        // newImage.src

        reader.onload = () => {
          let temp: any = reader.result;
          console.log("Reader Result ->", temp);

          this.httpServe.imageArr.push(reader.result);

        }
        reader.readAsDataURL(resultBlob);

        // let base64 = this.toBase64(result);
        // console.log("Result ->", base64);
      } else {
        let temp: any = data;

        let uint8 = new Uint8Array(temp);
        this.tempArray.push(uint8);
      }


      // this.httpServe.imageArr.push(data);
    });
  }

  private mergeArrays(arrays) {
    let result = [];
    arrays.forEach(array => {
      result.push(...array);
    });
    return result;
  }

  private toBase64(uint8) {
    return btoa(String.fromCharCode.apply(null, uint8));
  }

}
