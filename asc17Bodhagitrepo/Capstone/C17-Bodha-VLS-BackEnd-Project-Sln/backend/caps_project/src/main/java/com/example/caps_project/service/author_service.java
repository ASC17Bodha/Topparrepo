package com.example.caps_project.service;

import com.example.caps_project.entity.author_entity;
import com.example.caps_project.repository.author_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class author_service {

    @Autowired
    private author_repository authorRepository;

    // Create or Update an author
    public author_entity saveAuthor(author_entity author) {
        if (author.getAuthorId() == null || author.getAuthorId().isEmpty()) {
            author.setAuthorId(generateAuthorId());
        }
        return authorRepository.save(author);
    }

    // Get author by ID
    public Optional<author_entity> getAuthorById(String authorId) {
        return authorRepository.findById(authorId);
    }

    // Get all authors
    public Iterable<author_entity> getAllAuthors() {
        return authorRepository.findAll();
    }

    // Delete an author by ID
    public void deleteAuthor(String authorId) {
        authorRepository.deleteById(authorId);
    }

    // Check if author exists by ID
    public boolean existsById(String authorId) {
        return authorRepository.existsById(authorId);
    }
    // Method to generate a new authorId in the format A0001, A0002, ...
    private String generateAuthorId() {
        // Get the highest current authorId from the database
        String maxId = authorRepository.getMaxAuthorId();  // Assuming this method is implemented in your repository

        // If no authors exist, start with A0001
        if (maxId == null) {
            return "A0001";
        }

        // Extract the numeric part of the authorId (e.g., "A0001" -> 1)
        int nextId = Integer.parseInt(maxId.substring(1)) + 1;

        // Format the nextId into the A0001 format
        return String.format("A%04d", nextId);
    }
}
