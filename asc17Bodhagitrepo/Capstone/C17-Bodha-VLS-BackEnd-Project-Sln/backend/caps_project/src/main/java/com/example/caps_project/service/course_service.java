package com.example.caps_project.service;

import com.example.caps_project.entity.course_entity;
import com.example.caps_project.repository.course_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Optional;

@Service
public class course_service {

    @Autowired
    private course_repository courseRepository;

    // Create or Update a course
    public course_entity saveCourse(course_entity course) {
        if (course.getCourseId() == null || course.getCourseId().isEmpty()) {
            // Generate a new courseId if it's not provided
            course.setCourseId(generateCourseId());
        }
        return courseRepository.save(course);
    }

    // Get course by ID
    public Optional<course_entity> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    // Get all courses
    public Iterable<course_entity> getAllCourses() {
        return courseRepository.findAll();
    }

    // Delete a course by ID
    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }

    // Check if course exists by ID
    public boolean existsById(String courseId) {
        return courseRepository.existsById(courseId);
    }

    // Method to generate the courseId in the format C0001, C0002, ...
    private String generateCourseId() {
        // Get the latest course from the database (sorted by COURSE_ID)
        Optional<course_entity> lastCourse = courseRepository.findTopByOrderByCourseIdDesc();

        if (lastCourse.isPresent()) {
            String lastCourseId = lastCourse.get().getCourseId();
            // Remove the prefix 'C' and convert the rest to an integer
            int lastNumber = Integer.parseInt(lastCourseId.substring(1));
            // Increment the last number by 1
            int newNumber = lastNumber + 1;
            // Format the new course ID with leading zeros (e.g., C0001, C0002, ...)
            return "C" + new DecimalFormat("0000").format(newNumber);
        } else {
            // If no courses exist, start with C0001
            return "C0001";
        }
    }
}
