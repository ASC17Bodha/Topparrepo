// import { Injectable } from '@angular/core';
// import { AdminService } from './admin.service';  // Import AdminService
// import { Admin } from '../models/admin.model';   // Import the Admin model
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isLoggedIn = false;  // Initial login state

//   constructor(private adminService: AdminService) {}

//   // Login method that checks against the admins fetched from the backend
//   login(email: string, password: string): Observable<boolean> {
    
//     return new Observable<boolean>((observer) => {
//       // Fetch all admins from the AdminService
//       this.adminService.getAllAdmins().subscribe(
//         (admins: Admin[]) => {
//           // Check if the provided email and password match any admin
//           const admin = admins.find((a) => a.email === email && a.password === password);
//           if (admin) {
//             this.isLoggedIn = true;  // Set login state to true
//             observer.next(true);     // Return true if login successful
//           } else {
//             this.isLoggedIn = false;
//             observer.next(false);    // Return false if no match
//           }
//           observer.complete();  // Complete the observable
//         },
//         (error) => {
//           this.isLoggedIn = false;
//           observer.next(false);  // Return false if there's an error (e.g., no connection)
//           observer.complete();   // Complete the observable
//         }
//       );
//     });
//   }

//   // Logout method to change the login state
//   logout(): void {
//     this.isLoggedIn = false;
//   }

//   // Check if the user is authenticated
//   isAuthenticated(): boolean {
//     return this.isLoggedIn;
//   }
// }

import { Injectable } from '@angular/core';
import { AdminService } from './admin.service'; // Import AdminService
import { Admin } from '../models/admin.model';  // Import the Admin model
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private loginTimestampKey = 'loginTimestamp'; // Key to store the login timestamp
  private authTokenKey = 'authToken';          // Key to store authentication state

  constructor(private adminService: AdminService) {
    this.initializeLoginState();
  }

  // Initialize login state from local storage
  private initializeLoginState(): void {
    const loginTimestamp = localStorage.getItem(this.loginTimestampKey);
    const authToken = localStorage.getItem(this.authTokenKey);

    if (loginTimestamp && authToken) {
      const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
      if (timeElapsed <= 30 * 60 * 1000) { // Check if within 30 minutes
        this.isLoggedIn = true;
      } else {
        this.logout(); // Clear storage if session expired
      }
    }
  }

  // Login method that checks against the admins fetched from the backend
  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.adminService.getAllAdmins().subscribe(
        (admins: Admin[]) => {
          const admin = admins.find((a) => a.email === email && a.password === password);
          if (admin) {
            this.isLoggedIn = true;
            localStorage.setItem(this.authTokenKey, 'true'); // Save login state
            localStorage.setItem(this.loginTimestampKey, Date.now().toString()); // Save timestamp
            observer.next(true);
          } else {
            this.isLoggedIn = false;
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          this.isLoggedIn = false;
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // Logout method to clear the login state
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.authTokenKey); // Clear login state
    localStorage.removeItem(this.loginTimestampKey); // Clear timestamp
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

