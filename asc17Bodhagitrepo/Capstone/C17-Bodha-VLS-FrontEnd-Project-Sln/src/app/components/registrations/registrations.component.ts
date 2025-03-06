import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent {
  admins: Admin[] = []; // Store admins
  filteredAdmins: Admin[] = []; // Store filtered admins based on search
  currentAdmin: Admin = new Admin(); // For storing the admin being edited
  searchTerm: string = ''; // For storing the search query

  constructor(private adminService: AdminService, private router: Router){
    // Fetch all admins on component initialization
    this.adminService.getAllAdmins().subscribe((data) => {
      this.admins = data; // Assign the fetched data to the `admins` array
      this.filteredAdmins = [...this.admins]; // Initialize filteredAdmins with all admins initially
    });
  }

  // Update admin
  updateAdmin(admin: Admin) {
    this.adminService.updateAdmin(admin.aId, admin).subscribe((updatedAdmin) => {
      // Find the admin in the array and update it
      const index = this.admins.findIndex((a) => a.aId === updatedAdmin.aId);
      if (index !== -1) {
        this.admins[index] = updatedAdmin; // Update the admin in the list
        this.searchAdmins(); // Re-filter after update
      }
    });
  }

  // Delete admin
  deleteAdmin(aId: string) {
    this.adminService.deleteAdmin(aId).subscribe(() => {
      // Remove the deleted admin from the list
      this.admins = this.admins.filter((admin) => admin.aId !== aId);
      this.searchAdmins(); // Re-filter after delete
    });
  }

  // Set current admin for editing
  editAdmin(admin: Admin) {
    this.currentAdmin = { ...admin }; // Set the current admin to be edited
  }

  // Clear current admin (cancel edit)
  cancelEdit() {
    this.currentAdmin = new Admin(); // Clear the current admin
  }

  AddAdmin() {
    this.router.navigate(['/register']);
  }

  // Function to search admins by ID, Name, or Email
  searchAdmins() {
    this.filteredAdmins = this.admins.filter((admin) => {
      return (
        admin.aId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
