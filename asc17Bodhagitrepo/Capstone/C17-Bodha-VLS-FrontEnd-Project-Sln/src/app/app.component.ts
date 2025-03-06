import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'capsProject';
  constructor(private authService: AuthService,private router:Router) {}

  isLoggedIn():boolean{
    return this.authService.isAuthenticated();
  }

  //logout should fire swal logged out message and navigate to login page
   
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
