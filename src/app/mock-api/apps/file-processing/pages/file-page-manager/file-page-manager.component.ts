import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/mock-api/store';
import { FileService } from '../../services/files.service';
import { selectFile } from '../../store/selectors/files.selector';

@Component({
  selector: 'app-file-page-manager',
  templateUrl: './file-page-manager.component.html',
  styleUrls: ['./file-page-manager.component.scss']
})
export class FilePageManagerComponent implements OnInit {

  fileId: any;
  file: any;

  constructor(private service: FileService){

  }
  
  ngOnInit(): void {
 
    this.service.currentMessage.subscribe(file => this.file = file)
  
  }

}
