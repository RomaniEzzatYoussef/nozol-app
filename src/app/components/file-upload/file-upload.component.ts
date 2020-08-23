import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Output() filePick = new EventEmitter<File>();
  @Input() showPreview = false;

  constructor() { }

  ngOnInit() {}

  onFileSelected(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files[0];
    this.filePick.emit(selectedFile);
  }
}
