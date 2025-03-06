// src/app/components/courses/courses.component.ts

import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  selectedCourse: Course = {} as Course;
  isEditing: boolean = false;
  currentDate: string = '';
  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.getCourses();
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  getCourses(): void {
    this.coursesService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  saveCourse(): void {
    if (!this.selectedCourse.name || !this.selectedCourse.startDate || !this.selectedCourse.duration || !this.selectedCourse.description) {
      alert("Please fill out all fields!");
      return;
    }
  
    this.coursesService.saveCourse(this.selectedCourse).subscribe(
      (response) => {
        console.log('Course saved successfully:', response);
        this.getCourses();
        this.selectedCourse = {} as Course; // Reset the form
        this.isEditing = false;
      },
      (error) => {
        console.error('Error saving course:', error);
        alert("There was an error saving the course. Please check the console for details.");
      }
    );
  }
  



  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    this.isEditing = true;
  }

  deleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(courseId).subscribe(() => {
        this.getCourses();
      });
    }
  }

  resetForm(): void {
    this.selectedCourse = {} as Course;
    this.isEditing = false;
  }
}
