import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';




const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  FuseAlertModule,
  MatRippleModule,
  MatTabsModule,
  FuseHighlightModule,
  MatCheckboxModule,
  MatIconModule,
  MatStepperModule,
  MatDatepickerModule,
  FuseCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDividerModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatGridListModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  

];
@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class FuseMatModule {
}
