import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { snotityService, UserService } from '../../core/services';
import { UserLogin, UserRegister } from '../../core/models';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = 'register';
  title: String = '';
  isSubmitting = false;
  validateFormRegister: FormGroup;
  validateFormLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private snotityService: snotityService
  ) {
    // use FormBuilder to create a form group
    this.validateFormRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(64)]],
      surName: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(64)]],
      typeReg: ['WEB', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(23)]],
      emailaddress: ['', [Validators.required, Validators.email]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });

    this.validateFormLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(23)]],
      remember: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    });
  }

  submitForm(): void {
    const isLogin = this.authType === 'login';
    this.isSubmitting = true;
    const validateForm = isLogin
      ? this.validateFormLogin.controls
      : this.validateFormRegister.controls;

    for (const i in validateForm) {
      if (validateForm.hasOwnProperty(i)) {
        validateForm[i].markAsDirty();
        validateForm[i].updateValueAndValidity();
      }
    }

    delete this.validateFormRegister.value['checkPassword'];
    const user = isLogin ? this.validateFormLogin.value : this.validateFormRegister.value;

    if (isLogin) {
      this.login(user);
    } else {
      this.register(user);
    }
  }

  login(user: UserLogin): void {
    this.userService.login(user).subscribe(
      (data) => {
        this.userService.getUserProfile().subscribe(
          () => {
            this.snotityService.onSuccess('Login Success', 'Login');
            this.isSubmitting = false;
            this.router.navigateByUrl('/');
          },
          (err: any) => {
            this.snotityService.onError(err.error.message, 'Get Profile');
            this.isSubmitting = false;
          }
        );
      },
      (err: any) => {
        this.snotityService.onError(err.error.message, 'Login');
        this.isSubmitting = false;
      }
    );
  }

  register(user: UserRegister): void {
    this.userService.createOtp(user.phoneNumber).subscribe((data) => {
      const _user = { ...user, code: data };
      this.userService.register(_user).subscribe(
        () => {
          this.snotityService.onSuccess('Register success', 'Register');
          this.isSubmitting = false;
          this.router.navigateByUrl('/auth/login');
        },
        (err: any) => {
          this.snotityService.onError(err.error.message, 'Register');
          this.isSubmitting = false;
        }
      );
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateFormRegister.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateFormRegister.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
