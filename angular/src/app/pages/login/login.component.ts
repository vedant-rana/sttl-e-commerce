import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { loginUserType } from '../../types/userTypes';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCardTitle,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //passwordHide variable to handle visibility of password field of form
  passwordHide: boolean = true;

  // injecting required module and services in constructor
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private toaster: NgToastService
  ) {}

  // userLogin form Group for HTML form handle
  userLogin = this.fb.group({
    // email : required, should be a valid email address
    email: ['', [Validators.required, Validators.email]],

    // password : required, should be atleast 6 characters long
    password: ['', Validators.required],
  });

  // function to handle visibility of password field of form
  changePasswordVisibility(event: MouseEvent) {
    this.passwordHide = !this.passwordHide;
    event.stopPropagation();
  }

  /**
   * @purpose to submit login form data to API through User Service
   * @param none
   * @returns void
   */
  submitLoginData() {
    if (this.userLogin.valid) {
      //creating object of type loginUserType to send data to API server
      const loginUserData: loginUserType = {
        email: this.userLogin.value.email!,
        password: this.userLogin.value.password!,
      };

      //registering user by sending data to user Service
      this.userService.loginUser(loginUserData).subscribe({
        next: (data) => {
          // console.log(data);
          this.router.navigate(['/']); // naviagting to home page
          this.userService.userLoggedIn.emit(true);

          // adding all the local storage cart data to Logged in user's DB
          this.cartService.syncCartWithBackend();

          //toaster to give success message to user
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'User logged in successfully',
            duration: 3000,
          });
        },
        error: (err) => {
          // toaster to give error message to user if any error occurs
          this.toaster.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
          });
          console.log(err);
        },
      });
    } else {
      console.log('User Validation Failed');
    }
  }
}
