// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminService } from '../../services/admin.service';
// import { Admin } from '../../models/admin.model';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {
//   admin: Admin = new Admin('', '', '', '', '');
//   message: string = '';
  
//   // Validation error messages
//   emailError: string = '';
//   phoneError: string = '';
//   nameError: string = '';
//   passwordError: string = '';

//   // Email and Password validation regex
//   emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   nameRegex: RegExp = /^[a-zA-Z ]+$/; // Name should only contain letters and spaces

//   // Search variables
//   searchTerm: string = '';
//   filteredAdmins: Admin[] = [];

//   constructor(private adminService: AdminService, private router: Router) {}

//   // Function to check if email or phone is already in use
//   checkEmailAndPhoneExistence(): void {
//     this.adminService.getAllAdmins().subscribe(admins => {
//       const emailExists = admins.some(admin => admin.email === this.admin.email);
//       const phoneExists = admins.some(admin => admin.phone === this.admin.phone);

//       if (emailExists) {
//         this.emailError = 'This email is already in use.';
//       }

//       if (phoneExists) {
//         this.phoneError = 'This phone number is already in use.';
//       }
//     });
//   }

//   registerAdmin(): void {
//     this.emailError = '';
//     this.phoneError = '';
//     this.nameError = '';
//     this.passwordError = '';

//     // Validate inputs
//     if (!this.admin.name || !this.admin.email || !this.admin.password || !this.admin.phone) {
//       this.message = 'Please fill all required fields!';
//       return;
//     }

//     // Validate name (only letters and spaces)
//     if (!this.nameRegex.test(this.admin.name)) {
//       this.nameError = 'Name should not contain numbers or special characters';
//       return;
//     }

//     // Validate email format
//     if (!this.emailRegex.test(this.admin.email)) {
//       this.emailError = 'Invalid email format. Example: example@domain.com';
//       return;
//     }

//     // Validate password
//     if (!this.passwordRegex.test(this.admin.password)) {
//       this.passwordError = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
//       return;
//     }

//     // Check for duplicate email or phone
//     this.checkEmailAndPhoneExistence();

//     // If there are any errors (email or phone already exists), don't proceed with registration
//     if (this.emailError || this.phoneError) {
//       return;
//     }

//     // All validations passed, register the admin
//     this.adminService.createOrUpdateAdmin(this.admin).subscribe(
//       (response) => {
//         this.message = 'Admin registered successfully!';
//         setTimeout(() => this.router.navigate(['/admin-list']), 2000); // Delay navigation for user feedback
//       },
//       (error) => {
//         this.message = 'Error occurred while registering admin!';
//         console.error('Error occurred:', error);
//       }
//     );
//   }

//   // Function to search admins by ID, Name, or Email
//   searchAdmins(): void {
//     this.adminService.getAllAdmins().subscribe(admins => {
//       this.filteredAdmins = admins.filter(admin => {
//         return (
//           admin.aId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           admin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           admin.email.toLowerCase().includes(this.searchTerm.toLowerCase())
//         );
//       });
//     });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  admin: Admin = new Admin('', '', '', '', '');
  message: string = '';
  
  // Validation error messages
  emailError: string = '';
  phoneError: string = '';
  nameError: string = '';
  passwordError: string = '';

  // Email and Password validation regex
  emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  nameRegex: RegExp = /^[a-zA-Z ]+$/; // Name should only contain letters and spaces

  constructor(private adminService: AdminService, private router: Router) {}

  // Function to check if email or phone is already in use
  checkEmailAndPhoneExistence(): void {
    this.adminService.getAllAdmins().subscribe(admins => {
      const emailExists = admins.some(admin => admin.email === this.admin.email);
      const phoneExists = admins.some(admin => admin.phone === this.admin.phone);

      if (emailExists) {
        this.emailError = 'This email is already in use.';
      }

      if (phoneExists) {
        this.phoneError = 'This phone number is already in use.';
      }
    });
  }

  registerAdmin(): void {
    this.emailError = '';
    this.phoneError = '';
    this.nameError = '';
    this.passwordError = '';

    // Validate inputs
    if (!this.admin.name || !this.admin.email || !this.admin.password || !this.admin.phone) {
      this.message = 'Please fill all required fields!';
      return;
    }

    // Validate name (only letters and spaces)
    if (!this.nameRegex.test(this.admin.name)) {
      this.nameError = 'Name should not contain numbers or special characters';
      return;
    }

    // Validate email format
    if (!this.emailRegex.test(this.admin.email)) {
      this.emailError = 'Invalid email format. Example: example@domain.com';
      return;
    }

    // Validate password
    if (!this.passwordRegex.test(this.admin.password)) {
      this.passwordError = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
      return;
    }

    // Check for duplicate email or phone
    this.checkEmailAndPhoneExistence();

    // If there are any errors (email or phone already exists), don't proceed with registration
    if (this.emailError || this.phoneError) {
      return;
    }

    // All validations passed, register the admin
    this.adminService.createOrUpdateAdmin(this.admin).subscribe(
      (response) => {
        this.message = 'Admin registered successfully!';
        setTimeout(() => this.router.navigate(['/admin-list']), 2000); // Delay navigation for user feedback
      },
      (error) => {
        this.message = 'Error occurred while registering admin!';
        console.error('Error occurred:', error);
      }
    );
  }
}
