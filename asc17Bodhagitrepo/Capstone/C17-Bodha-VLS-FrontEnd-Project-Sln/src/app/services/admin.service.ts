// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Create or Update an admin
  createOrUpdateAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  // Get all admins
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  // Get admin by ID
  getAdminById(aId: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${aId}`);
  }

  // Delete an admin by ID
  deleteAdmin(aId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${aId}`);
  }

  // Update admin
  updateAdmin(aId: string, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${aId}`, admin);
  }
}
