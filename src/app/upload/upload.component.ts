import { Component, OnInit } from '@angular/core';
import { ObEUploadEventType, ObIFileDescription, ObIUploadEvent } from '@oblique/oblique';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {

  logs: ObIUploadEvent[] = [];
  uploadUrl = 'https://testdocuploadthomas.azurewebsites.net/api/docupload?code=50H6odzfzyy0optYc9rhnZywQBxu9EBlJfZIlQDldADKAzFuHuAPTQ==';
  getUrl = 'https://testdocuploadthomas.azurewebsites.net/api/getfiles?code=Zthc1Sj1gBLKNPoo0jEEn3YGtc_3D4qWyL-kHot6KYJBAzFuIlY3ww==';
  maxFileSize = 100;
  multipleFile = true;
  singleRequest = false;
  readonly acceptFilesOptions = [
    ['*'],
    ['.txt', '.ts'],
    ['.txt', '.ts', '.xlsx'],
    ['.txt', '.ts', '.xlsx', 'docx'],
    ['.txt', '.ts', '.xlsx', '.exe'],
    ['.txt', '.ts', '.cs', '.xlsx', '.exe', 'text/html', '.tgz', '.zip']
  ];
  acceptFiles = this.acceptFilesOptions[0];
  uploadedFiles: Record<string, number> = {};

  uploadEvent(event: any): void {
    console.log("uplaoded File: ", this.uploadedFiles)
  }

  // This function wraps the actual map function so that its context is preserved (i.e. this points to FileUploadPreviewComponent)
  mapData(): (files: any[]) => any[] {
    return (files: any[]): any[] => files.map(file => {
      file.size = file.size < 1000000 ? parseInt(Math.round(file.size / 1000).toString()) + " KB" : parseInt(Math.round(file.size / 1000000).toString()) + " MB"
      file.lastModified = new Date(file.lastModified).toLocaleString("de-CH");
      return file
    });
  }
}

