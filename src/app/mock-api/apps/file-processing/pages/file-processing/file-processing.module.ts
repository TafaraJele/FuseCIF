import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePageManagerComponent } from '../file-page-manager/file-page-manager.component';
import { FileDefundComponent } from '../file-defund/file-defund.component';
import { FileDefundListComponent } from '../file-defund-list/file-defund-list.component';
import { FileFundloadComponent } from '../file-fundload/file-fundload.component';
import { FileFundListComponent } from '../file-fund-list/file-fund-list.component';
import { FileListPageComponent } from '../file-list-page/file-list-page.component';
import { FilePageComponent } from '../file-page/file-page.component';
import { SettingsComponent } from '../settings/settings.component';
import { FilesResolver } from '../../services/files.resolver';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cards',
    component: FileListPageComponent,
    // resolve: {
    //   files: FilesResolver
    // }
  },
  {
    path: 'funding',
    component: FileFundListComponent,
    // resolve: {
    //   files: FilesResolver
    // }
  },
  {
    path: 'defunding',
    component: FileDefundListComponent,
    // resolve: {
    //   files: FilesResolver
    // }
  },
  {
    path: 'files/:id',
    component: FilePageManagerComponent,
    // resolve: {
    //   files: FilesResolver
    // }
  },
  {
    path: 'settings',
    component: SettingsComponent
  },

]

@NgModule({
  declarations: [FileDefundComponent, FileDefundListComponent, FileFundloadComponent, FileFundListComponent, FileListPageComponent, FilePageComponent, FilePageManagerComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FileProcessingModule { }
