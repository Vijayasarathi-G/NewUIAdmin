import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../_helpers/must-match.validators';
import {Router} from '@angular/router';
import {ToastService} from '../../toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private toastService: ToastService) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {

    this.toastService.show({
      text: 'Welcom to my Admin panel',
      type: 'success',
    });

    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.valid) {
      return;
    } else {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.toastService.show({
            text: data.message,
            type: 'success',
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        err => {
            this.toastService.show({
            text: err.error.message,
            type: 'error',
          });
          this.isSignUpFailed = true;
        }
      );
    }
  }

}
