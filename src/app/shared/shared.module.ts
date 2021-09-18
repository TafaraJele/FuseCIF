import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseMatModule } from './fuse-mat/fuse-mat.module';
import { NotificationsComponent } from './notifications/notify-component/notifications/notifications.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseMatModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseMatModule
    ],
    declarations: [
      NotificationsComponent
    ]
})
export class SharedModule
{
}
