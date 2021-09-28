import { Component, OnInit } from '@angular/core';
import { FileService } from 'app/mock-api/apps/file-processing/services/files.service';
import { UploadResponse } from 'app/shared/models/upload-reponse';

@Component({
  selector: 'app-upload-responses',
  templateUrl: './upload-responses.component.html',
  styleUrls: ['./upload-responses.component.scss']
})
export class UploadResponsesComponent implements OnInit {
response: UploadResponse
  constructor(private service: FileService) { }

  ngOnInit(): void {
this.service.currentResponse.subscribe(response =>{
  this.response = response
})

  }

}
