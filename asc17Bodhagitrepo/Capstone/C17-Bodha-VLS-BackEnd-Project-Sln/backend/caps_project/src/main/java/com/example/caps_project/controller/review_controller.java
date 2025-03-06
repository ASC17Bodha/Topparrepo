package com.example.caps_project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.caps_project.entity.review_entity;
import com.example.caps_project.service.review_service;

@RestController
@RequestMapping("/api/review")
public class review_controller {

    @Autowired
    private review_service reviewService;

    // Create or Update a review
    @PostMapping
    public ResponseEntity<review_entity> createOrUpdateReview(@RequestBody review_entity review) {
        review_entity savedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // Get a review by ID
    @GetMapping("/{rId}")
    public ResponseEntity<review_entity> getReviewById(@PathVariable String rId) {  // Changed to String for R_ID
        Optional<review_entity> review = reviewService.getReviewById(rId);
        return review.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all reviews
    @GetMapping
    public ResponseEntity<Iterable<review_entity>> getAllReviews() {
        Iterable<review_entity> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    // Delete a review by ID
    @DeleteMapping("/{rId}")
    public ResponseEntity<Void> deleteReview(@PathVariable String rId) {  // Changed to String for R_ID
        if (reviewService.existsById(rId)) {
            reviewService.deleteReview(rId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{rId}")
    public ResponseEntity<review_entity> updateReview(@PathVariable String rId, @RequestBody review_entity review) {
        Optional<review_entity> existingReview = reviewService.getReviewById(rId);

        if (existingReview.isPresent()) {
            review.setrId(rId);  // Ensure the review's ID matches the URL path
            review_entity updatedReview = reviewService.saveReview(review);
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }
}
