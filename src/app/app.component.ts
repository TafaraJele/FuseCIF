/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'environments/environment';
import { AppAuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private auth: AuthService,
        private userService: UserService,
        private authService: AppAuthService
    ) {
    }
    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe((authenticated) => {
            this.authService._authenticated$.next(authenticated);
            this.router.navigateByUrl('/dashboard');
        });
        this.auth.getAccessTokenSilently().subscribe((token) => {
            if (token) {
                environment.accessToken = token;
            }
        });
        this.auth.idTokenClaims$.subscribe((token) => {
            this.authService.user$.next(token);
            environment.user = token;
            this.userService.get();
        });
    }
}
