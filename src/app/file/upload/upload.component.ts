import {Component, OnDestroy, OnInit} from '@angular/core';
import {UploadFileService} from '../../_services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {

  selectedFiles: FileList;
  currentFileUpload: File;
  id: any;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: UploadFileService) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.id = setInterval(() => {
      if (this.progress.percentage === 100) {
        setTimeout(() => {
          this.currentFileUpload = null;
        }, 1000);
      }
    }, 5000);
    this.selectedFiles = undefined;
  }

  ngOnDestroy(): void {
    clearInterval(this.id);
  }

}
