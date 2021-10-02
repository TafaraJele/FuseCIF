import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    ExtraOptions,
    PreloadAllModules,
    RouteReuseStrategy,
    RouterModule,
} from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MicroFrontendRouteReuseStrategy } from 'services/route-reuse-strategy';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment as env, environment } from '../environments/environment';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { FuseMatModule } from './shared/fuse-mat/fuse-mat.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from './shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { MatTabsModule } from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './mock-api/store';
import { FilePageManagerComponent } from './mock-api/apps/file-processing/pages/file-page-manager/file-page-manager.component';
import { MastercardDefundComponent } from './mock-api/apps/file-processing/pages/file-uploads/mastercard-defunding/mastercard-defund/mastercard-defund.component';
import { MastercardFundingComponent } from './mock-api/apps/file-processing/pages/file-uploads/mastercard-funding/mastercard-funding/mastercard-funding.component';
import { DatePipe } from '@angular/common';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        FuseMatModule,
        MatTabsModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: false,
                strictActionSerializability: false
            }
        }),
        EffectsModule.forRoot([]),
        // !environment.production ? StoreDevtoolsModule.instrument() : [],


        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        FuseAlertModule,
        SharedModule,
        FuseHighlightModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        AuthModule.forRoot({
            ...env.auth,
            httpInterceptor: {
                ...env.httpInterceptor,
            },
        }),
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: MicroFrontendRouteReuseStrategy,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        {
            provide : FilePageManagerComponent
        },
        DatePipe
    ],
    bootstrap: [AppComponent],

})
export class AppModule { }
