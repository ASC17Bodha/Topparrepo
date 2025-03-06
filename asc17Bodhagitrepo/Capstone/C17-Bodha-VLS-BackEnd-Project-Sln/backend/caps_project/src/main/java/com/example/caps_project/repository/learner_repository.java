package com.example.caps_project.repository;

import com.example.caps_project.entity.learner_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface learner_repository extends JpaRepository<learner_entity, String> {
}
