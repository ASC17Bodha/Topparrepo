package com.example.caps_project.service;

import com.example.caps_project.entity.review_entity;
import com.example.caps_project.repository.review_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class review_service {

    @Autowired
    private review_repository reviewRepository;

    // Create or Update a review
    public review_entity saveReview(review_entity review) {
        return reviewRepository.save(review);
    }

    // Get review by ID
    public Optional<review_entity> getReviewById(String rId) {  // Changed to String for R_ID
        return reviewRepository.findById(rId);
    }

    // Get all reviews
    public Iterable<review_entity> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Delete a review by ID
    public void deleteReview(String rId) {  // Changed to String for R_ID
        reviewRepository.deleteById(rId);
    }

    // Check if review exists by ID
    public boolean existsById(String rId) {  // Changed to String for R_ID
        return reviewRepository.existsById(rId);
    }
}
