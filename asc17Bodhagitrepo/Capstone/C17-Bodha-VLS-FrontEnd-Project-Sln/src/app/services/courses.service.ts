// src/app/services/courses.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:8080/api/course';  // Adjust with your backend URL

  constructor(private http: HttpClient) { }

  // Get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Get course by ID
  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }

  // Save or update a course
  saveCourse(course: Course): Observable<Course> {
    if (course.courseId) {
      return this.http.put<Course>(`${this.apiUrl}/${course.courseId}`, course); // Update course
    } else {
      return this.http.post<Course>(this.apiUrl, course); // Create new course
    }
  }

  // Delete course by ID
  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }
}
