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
import { SharedModule } from 'app/shared/shared.module';
import { SettingsCifComponent } from '../settings/settings-cif/settings-cif.component';
import { SettingsPaymentFileComponent } from '../settings/settings-payment-file/settings-payment-file.component';
import { SettingsAmlockComponent } from '../settings/settings-amlock/settings-amlock.component';
import { SettingsFimiComponent } from '../settings/settings-fimi/settings-fimi.component';
import { SettingsFlexcubeComponent } from '../settings/settings-flexcube/settings-flexcube.component';
import { MastercardDefundComponent } from '../file-uploads/mastercard-defunding/mastercard-defund/mastercard-defund.component';
import { MastercardFundingComponent } from '../file-uploads/mastercard-funding/mastercard-funding/mastercard-funding.component';
import { UploadResponsesComponent } from '../file-uploads/upload-responses/upload-responses/upload-responses.component';

const routes: Routes = [
  {
    path: 'cards',
    component: FileListPageComponent,
    resolve: {
      files: FilesResolver
    }
  },
  {
    path: 'funding',
    component: FileFundListComponent,
    resolve: {
      files: FilesResolver
    }
  },
  {
    path: 'defunding',
    component: FileDefundListComponent,
    resolve: {
      files: FilesResolver
    }
  },
  {
    path: 'files/:id',
    component: FilePageManagerComponent,
    resolve: {
      files: FilesResolver
    }
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'mastercard-funding',
    component: MastercardFundingComponent
  },
  {
    path: 'mastercard-defunding',
    component: MastercardDefundComponent
  }

]

@NgModule({
  declarations: [
    FileDefundComponent,
    FileDefundListComponent,
    FileFundloadComponent,
    FileFundListComponent,
    FileListPageComponent,
    FilePageComponent,
    FilePageManagerComponent,
    SettingsComponent,
    SettingsCifComponent,
    SettingsPaymentFileComponent,
    SettingsAmlockComponent,
    SettingsFimiComponent,
    SettingsFlexcubeComponent,
    MastercardDefundComponent,
    MastercardFundingComponent,
    UploadResponsesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FileProcessingModule { }
