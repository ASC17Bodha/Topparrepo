package com.example.caps_project.controller;



import java.util.Optional;

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

import com.example.caps_project.entity.author_entity;
import com.example.caps_project.service.author_service;

    @RestController
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/api/author")
    public class author_controller {

        @Autowired
        private author_service authorService;

        // Create or Update an author
        @PostMapping
        public ResponseEntity<author_entity> createOrUpdateAuthor(@RequestBody author_entity author) {
            author_entity savedAuthor = authorService.saveAuthor(author);
            return new ResponseEntity<>(savedAuthor, HttpStatus.CREATED);
        }

        // Get an author by ID
        @GetMapping("/{authorId}")
        public ResponseEntity<author_entity> getAuthorById(@PathVariable String authorId) {
            Optional<author_entity> author = authorService.getAuthorById(authorId);
            return author.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }

        // Get all authors
        @GetMapping
        public ResponseEntity<Iterable<author_entity>> getAllAuthors() {
            Iterable<author_entity> authors = authorService.getAllAuthors();
            return ResponseEntity.ok(authors);
        }

        // Delete an author by ID
        @DeleteMapping("/{authorId}")
        public ResponseEntity<Void> deleteAuthor(@PathVariable String authorId) {
            if (authorService.existsById(authorId)) {
                authorService.deleteAuthor(authorId);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }

        // Update an existing author (PUT method)
        @PutMapping("/{authorId}")
        public ResponseEntity<author_entity> updateAuthor(@PathVariable String authorId, @RequestBody author_entity author) {
            Optional<author_entity> existingAuthor = authorService.getAuthorById(authorId);

            if (existingAuthor.isPresent()) {
                author.setAuthorId(authorId);  // Ensure the author's ID matches the URL path
                author_entity updatedAuthor = authorService.saveAuthor(author);
                return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
            }

            return ResponseEntity.notFound().build();
        }
    }

