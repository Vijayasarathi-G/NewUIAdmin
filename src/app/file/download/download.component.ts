import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../../_services/upload-file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileUploads = this.uploadService.getFiles();
  }

  showFiles(enable: boolean) {
    this.showFile = enable;
  }
}
