package com.example.caps_project.repository;

import com.example.caps_project.entity.author_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface author_repository extends JpaRepository<author_entity, String> {
    // Custom query to get the maximum authorId (based on numeric value)
    @Query("SELECT MAX(a.authorId) FROM author_entity a")
    String getMaxAuthorId();
}
