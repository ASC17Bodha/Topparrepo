package com.example.caps_project.controller;

import java.util.Optional;

import com.example.caps_project.entity.author_entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.caps_project.entity.course_entity;
import com.example.caps_project.repository.author_repository;
import com.example.caps_project.service.course_service;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = "http://localhost:4200")
public class course_controller {

    @Autowired
    private course_service courseService;

    @Autowired
    private author_repository authorRepository;

    // Create or Update a course
    @PostMapping
    public ResponseEntity<course_entity> createOrUpdateCourse(@RequestBody course_entity course) {
        // Resolve the assigned author if only authorId is provided
//        if (course.getAssignedTo() != null && course.getAssignedTo().getAuthorId() != null) {
//            String authorId = course.getAssignedTo().getAuthorId();
//            Optional<author_entity> author = authorRepository.findById(authorId);
//
//            if (author.isPresent()) {
//                course.setAssignedTo(author.get());
//            } else {
//                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Invalid author ID
//            }
//        }

        course_entity savedCourse = courseService.saveCourse(course);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    // Get a course by ID
    @GetMapping("/{courseId}")
    public ResponseEntity<course_entity> getCourseById(@PathVariable String courseId) {
        Optional<course_entity> course = courseService.getCourseById(courseId);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all courses
    @GetMapping
    public ResponseEntity<Iterable<course_entity>> getAllCourses() {
        Iterable<course_entity> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Delete a course by ID
    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String courseId) {
        if (courseService.existsById(courseId)) {
            courseService.deleteCourse(courseId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Update an existing course (PUT method)
    @PutMapping("/{courseId}")
    public ResponseEntity<course_entity> updateCourse(@PathVariable String courseId, @RequestBody course_entity course) {
        Optional<course_entity> existingCourse = courseService.getCourseById(courseId);

        if (existingCourse.isPresent()) {
            course.setCourseId(courseId);  // Ensure the course's ID matches the URL path
            course_entity updatedCourse = courseService.saveCourse(course);
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }

}
