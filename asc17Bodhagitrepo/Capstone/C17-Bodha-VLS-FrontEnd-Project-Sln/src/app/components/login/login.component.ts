// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   loginAttempts = 0;
//   maxAttempts = 3;
//   isDisabled = false;
//   remainingTime = 30;
//   timer: any;

//   constructor(private router: Router, private authService: AuthService) {}

//   login() {
//     if (this.email === '' || this.password === '') {
//       alert('Email and Password cannot be blank.');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!emailRegex.test(this.email) || !passwordRegex.test(this.password)) {
//       alert('Invalid email or password format.');
//       this.handleFailedAttempt();
//       return;
//     }

//     // Use AuthService to check login credentials
//     this.authService.login(this.email, this.password).subscribe((isLoggedIn) => {
//       if (isLoggedIn) {
//         alert('Login successful!');
//         this.router.navigate(['/dashboard']);
//       } else {
//         alert('Invalid credentials.');
//         this.handleFailedAttempt();
//       }
//     });
//   }

//   handleFailedAttempt() {
//     this.loginAttempts++;
//     const remainingAttempts = this.maxAttempts - this.loginAttempts;

//     if (remainingAttempts > 0) {
//       alert(`Invalid credentials. Attempts remaining: ${remainingAttempts}`);
//     } else {
//       alert('Too many unsuccessful attempts. Login disabled for 30 seconds.');
//       this.disableLoginButton();
//     }
//   }

//   disableLoginButton() {
//     this.isDisabled = true;
//     this.remainingTime = 30;

//     this.timer = setInterval(() => {
//       this.remainingTime--;
//       if (this.remainingTime === 0) {
//         clearInterval(this.timer);
//         this.resetLogin();
//       }
//     }, 1000);
//   }

//   resetLogin() {
//     this.isDisabled = false;
//     this.loginAttempts = 0;
//     this.remainingTime = 30;
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loginAttempts = 0;
  maxAttempts = 3;
  isDisabled = false;
  remainingTime = 30;
  timer: any;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email === '' || this.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email and Password cannot be blank.',
        timer: 3000,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(this.email) || !passwordRegex.test(this.password)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Invalid email or password format.',
        timer: 3000,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
      this.handleFailedAttempt();
      return;
    }

    // Use AuthService to check login credentials
    this.authService.login(this.email, this.password).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 3000,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Please check your email and password.',
          timer: 3000,
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
        });
        this.handleFailedAttempt();
      }
    });
  }

  handleFailedAttempt() {
    this.loginAttempts++;
    const remainingAttempts = this.maxAttempts - this.loginAttempts;

    if (remainingAttempts > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Credentials',
        text: `Attempts remaining: ${remainingAttempts}`,
        timer: 3000,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Too Many Attempts',
        text: 'Login disabled for 30 minutes.',
        timer: 3000,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
      });
      this.disableLoginButton();
    }
  }

  disableLoginButton() {
    this.isDisabled = true;
    this.remainingTime = 30;

    this.timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        clearInterval(this.timer);
        this.resetLogin();
      }
    }, 1000);
  }

  resetLogin() {
    this.isDisabled = false;
    this.loginAttempts = 0;
    this.remainingTime = 30;
  }
}
