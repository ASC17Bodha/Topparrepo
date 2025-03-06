import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Define an array of objects representing each component
  sections: { title: string, description: string, route: string }[] = [
    { title: 'Courses', description: 'Browse and manage all available courses for learners.', route: '/courses' },
    { title: 'Authors', description: 'Manage authors and their content contributions.', route: '/authors' },
    { title: 'Learners', description: 'View and manage learner registrations.', route: '/learners' },
    { title: 'Registrations', description: 'Track and manage Admin registrations.', route: '/registrations' },
    { title: 'Admin Registration', description: 'Register admins for the platform.', route: '/admin-registration' },
    { title: 'Reviews', description: 'View and manage course reviews submitted by learners.', route: '/reviews' }
  ];

  constructor(private router: Router) {}

  // Navigate to the selected section
  navigateToSection(route: string) {
    this.router.navigate([route]);
  }
}
