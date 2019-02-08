import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  Events,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { MediaProvider } from '../../providers/media/media';
import { ToastProvider } from '../../providers/toast/toast';
import { Chooser } from '@ionic-native/chooser';

@IonicPage()
@Component({
  selector: 'page-file-upload',
  templateUrl: 'file-upload.html'
})
export class FileUploadPage {
  selectedFile = {
    preview: null,
    info: null
  };

  brightness = 100;
  contrast = 100;
  grayscale = 0;
  hue = 0;
  invert = 0;
  saturate = 100;
  sepia = 0;

  canvasCtx = null;
  image = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private spinner: LoadingController,
    private toast: ToastProvider,
    private event: Events,
    private chooser: Chooser
  ) {}

  @ViewChild('description') description: ElementRef;
  @ViewChild('file') fileInput: ElementRef;
  @ViewChild('imageCanvas') imageCanvas: ElementRef;

  resize() {
    this.description['_native'].nativeElement.style.height = 'auto';
    this.description['_native'].nativeElement.style.height =
      this.description['_native'].nativeElement.scrollHeight + 'px';
  }

  onSubmit(form: NgForm) {
    console.log('title: ', form.value.title);
    console.log('description: ', form.value.description);

    const postData = new FormData();

    // postData.append('file', this.fileInput.nativeElement.files[0]);
    // postData.append('title', form.value.title);
    // postData.append('description', form.value.description);

    const blobConversion = () => {
      return new Promise(resolve => {
        this.imageCanvas.nativeElement.toBlob(blob => {
          postData.append('file', blob, 'imagefile.jpg');
          postData.append('title', form.value.title);
          postData.append('description', form.value.description);
          console.log('Blob created!');
          resolve();
        }, 'image/jpeg');
      });
    };

    blobConversion().then(_ => {
      console.log('Uploading data...');

      const uploading = this.spinner.create({
        content: 'Uploading media...'
      });
      const finishing = this.spinner.create({
        content: 'Finishing up...'
      });

      uploading.present();

      this.mediaProvider.uploadMedia(postData).subscribe(
        res => {
          console.log('Success response form server: ', res);
          uploading.dismiss();
          finishing.present();
          setTimeout(() => {
            finishing.dismiss();
            this.event.publish('new-upload', res['file_id']);
            this.navCtrl.pop();
          }, 2000);
        },
        err => {
          console.log(err);
          uploading.dismiss();
          this.toast.show(err.message);
        }
      );
    });
  }

  clearPreview() {
    if (this.selectedFile.preview !== null) {
      setTimeout(_ => {
        console.log('clearing preview...');
        this.selectedFile.preview = null;
        this.selectedFile.info = null;
      }, 200);
    }
  }

  updatePreview(inputEvent) {
    console.log('File input changed');

    const data = inputEvent.target.files[0];

    if (data) {
      const reader = new FileReader();
      this.image = new Image();
      reader.readAsDataURL(data);
      reader.onload = (event: any) => {
        this.selectedFile.preview = event.target.result;
        this.image.src = event.target.result;
        this.image.onload = () => {
          setTimeout(() => {
            this.imageCanvas.nativeElement.width = this.image.width;
            this.imageCanvas.nativeElement.height = this.image.height;
            this.canvasCtx = this.imageCanvas.nativeElement.getContext('2d');
            this.canvasCtx.drawImage(this.image, 0, 0);
          }, 200);
        };
      };

      this.selectedFile.info = data;
    } else {
      this.canvasCtx = null;
      this.selectedFile.preview = null;
      this.selectedFile.info = null;
    }

    console.log('Selected file: ', this.selectedFile);
  }

  updatePreviewWithChooser(file) {
    console.log('File input changed');

    if (file) {
      this.image = new Image();
      this.selectedFile.preview = file.dataURI;
      this.image.src = file.dataURI;
      this.image.onload = () => {
        setTimeout(() => {
          this.imageCanvas.nativeElement.width = this.image.width;
          this.imageCanvas.nativeElement.height = this.image.height;
          this.canvasCtx = this.imageCanvas.nativeElement.getContext('2d');
          this.canvasCtx.drawImage(this.image, 0, 0);
        }, 200);
      };

      this.selectedFile.info = file.mediaType;
    } else {
      this.canvasCtx = null;
      this.selectedFile.preview = null;
      this.selectedFile.info = null;
    }

    console.log('Selected file: ', file);
  }

  rangeChange() {
    this.canvasCtx.filter = this.getFilters();
    this.canvasCtx.drawImage(this.image, 0, 0);
  }

  getFilters() {
    return `
    brightness(${this.brightness}%)
    contrast(${this.contrast}%)
    saturate(${this.saturate}%)
    hue-rotate(${this.hue}deg)
    grayscale(${this.grayscale}%)
    invert(${this.invert}%)
    sepia(${this.sepia}%)
    `;
  }

  getFile() {
    this.chooser
      .getFile('image/*, video/*')
      .then(file => {
        console.log(file ? file : 'canceled');
        this.updatePreviewWithChooser(file);
        // this.selectedFile.preview = file.dataURI;
        // this.selectedFile.info = file.mediaType;
      })
      .catch((error: any) => console.error(error));
  }
}
