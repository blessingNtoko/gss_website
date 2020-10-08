import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private tempArray = [];
  private trustedUrl: SafeResourceUrl;


  constructor(
    public httpServe: HttpService,
    private socket: SocketService,
    private sanitize: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.socket.getImages();

    this.socket.gotImages().subscribe(data => {
      let reader = new FileReader();

      if (typeof (data) === "string") {
        let result = this.mergeArrays(this.tempArray);
        // let imgTag = document.getElementById("images");

        let resultBlob = new Blob(result, { type: "image/png" });
        console.log("Blob ->", resultBlob);
        // let blobURL = URL.createObjectURL(resultBlob);

        // this.trustedUrl = this.sanitize.bypassSecurityTrustResourceUrl(blobURL);

        // console.log(this.trustedUrl);




        // console.log(newImage);

        reader.onload = () => {
          let temp: any = reader.result;
          console.log("Reader Result ->", temp);
          this.httpServe.imageArr.push(temp);

          // let newImage = new Image();
          // newImage.src = temp;

          // imgTag.appendChild(newImage);
          // console.log(this.httpServe.imageArr);
        }
        reader.readAsDataURL(resultBlob);


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
