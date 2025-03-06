package com.example.caps_project.repository;

import com.example.caps_project.entity.course_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface course_repository extends JpaRepository<course_entity, String> {

    // Custom query to fetch the latest course by ID
    Optional<course_entity> findTopByOrderByCourseIdDesc();
}
