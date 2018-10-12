import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html'
})
export class CamaraComponent {
  public titulo: string;
  private trigger: Subject<void> = new Subject<void>();
  public webcAmImage: WebcamImage = null;
  public videoOptions: MediaTrackConstraints;

  constructor() {
    this.titulo = 'Camara';
  }


  capturarImage() {
    this.trigger.next();
  }

  getImage(webcamImage: WebcamImage): void {
    this.webcAmImage = webcamImage;
  }

  getVideo(cameraSwitched: string) {
    console.log(cameraSwitched);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  descargarImage() {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = this.webcAmImage.imageAsDataUrl;
    a.download = 'image.jpg';
    a.click();
    window.URL.revokeObjectURL(this.webcAmImage.imageAsDataUrl);
    a.remove();

  }
}
