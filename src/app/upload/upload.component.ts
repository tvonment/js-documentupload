import { Component, OnInit } from '@angular/core';
import { ObEUploadEventType, ObIFileDescription, ObIUploadEvent } from '@oblique/oblique';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {

  logs: ObIUploadEvent[] = [];
  uploadUrl = 'http://localhost:7071/api/docupload';
  getUrl = 'http://localhost:7071/api/getfiles';
  maxFileSize = 5;
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
    console.log("Event: ", event)
    this.logs.push(event);
    /*if (event.type === ObEUploadEventType.CHOSEN) {
      event.files.forEach((file: any) => (this.uploadedFiles[file.name] = file.size));
    }*/
    console.log("uplaoded File: ", this.uploadedFiles)
  }

  // This function wraps the actual map function so that its context is preserved (i.e. this points to FileUploadPreviewComponent)
  mapData(): (files: ObIFileDescription[]) => ObIFileDescription[] {
    return (files: ObIFileDescription[]): ObIFileDescription[] => files.map(file => ({ ...file }));
  }
}
