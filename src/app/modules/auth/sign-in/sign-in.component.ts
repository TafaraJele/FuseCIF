import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AppAuthService } from 'app/core/auth/auth.service';
import { Credentials } from 'app/shared/models/indigo-credentials';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    isauthenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AppAuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],

        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        //Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }
        var credentials: Credentials = {

            username: this.signInForm.value['username'],
            password: this.signInForm.value['password']
        }
        // Disable the form
        this.signInForm.disable();

        //     Hide the alert
           this.showAlert = false;

        // Sign in
        this._authService.signIn(credentials)
            .subscribe(

                (response) => {
                    this.isauthenticated = false;
                   
                    if (response.accepted) {

                        this._router.navigateByUrl('/dashboard');
                    }
                    else {
                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: 'Wrong email or password'
                        };

                        // Show the alert
                        this.showAlert = true;
                    }

                }
            );
    }
}
