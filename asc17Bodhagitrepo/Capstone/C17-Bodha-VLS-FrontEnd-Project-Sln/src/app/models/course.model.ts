// src/app/models/course.model.ts

export interface Course {
  courseId: string;
  name: string;
  startDate: string;
  duration: number;
  description: string;
  // assignedTo: string;  // Assuming it's an author ID, you might replace this with an author object if needed
}
