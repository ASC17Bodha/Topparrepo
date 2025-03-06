import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AttendeesService } from '../attendees/attendees.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private attendeeService: AttendeesService) {}

  login(email: string, password: string): Observable<boolean> {
    return this.attendeeService.getAttendees().pipe(
      map(attendees => {
        const validUser = attendees.find(
          attendee => attendee.email === email && attendee.password === password
        );
        
        if (validUser) {
          this.isAuthenticated = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(validUser));
          return true;

        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getValidUserEmail(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.email : '';
  }
  
}
