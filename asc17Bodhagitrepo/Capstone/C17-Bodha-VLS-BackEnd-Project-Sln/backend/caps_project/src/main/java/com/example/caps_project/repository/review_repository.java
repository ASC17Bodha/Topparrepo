package com.example.caps_project.repository;

import com.example.caps_project.entity.review_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface review_repository extends JpaRepository<review_entity, String> {  // Changed to String for R_ID
}
