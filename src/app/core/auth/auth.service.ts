/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'environments/environment';

@Injectable()
export class AppAuthService {
    token$: BehaviorSubject<any>;
    user$: BehaviorSubject<any>;
    _authenticated$ = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor(
        public auth: AuthService,
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
        this.token$ = new BehaviorSubject('');
        this.user$ = new BehaviorSubject({});
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this.auth.getAccessTokenSilently().pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.token$.next(response.accessToken);

                // Set the authenticated flag to true
                this._authenticated$.next(true);

                // Store the user on the user service
                // this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );


        // this._httpClient.post('api/auth/refresh-access-token', {
        //     accessToken: this.token$.value
        // }).pipe(
        //     catchError(() =>

        //         // Return false
        //         of(false)
        //     ),
        //     switchMap((response: any) => {

        //         // Store the access token in the local storage
        //         this.token$.next(response.accessToken);

        //         // Set the authenticated flag to true
        //      //   this._authenticated$ = true;

        //         // Store the user on the user service
        //         this._userService.user = response.user;

        //         // Return true
        //         return of(true);
        //     })
        // );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        this.auth.logout();
        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated$.value) {
            return of(true);
        }

        // Check the access token availability
        if (!environment.accessToken) {
            return of(false);
        }



        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
