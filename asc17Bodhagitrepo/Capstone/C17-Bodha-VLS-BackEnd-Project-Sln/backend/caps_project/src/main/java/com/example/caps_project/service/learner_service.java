package com.example.caps_project.service;

import com.example.caps_project.entity.learner_entity;
import com.example.caps_project.repository.learner_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class learner_service {

    @Autowired
    private learner_repository learnerRepository;

    // Create or Update a learner
    public learner_entity saveLearner(learner_entity learner) {
        return learnerRepository.save(learner);
    }

    // Get learner by ID
    public Optional<learner_entity> getLearnerById(String learnerId) {
        return learnerRepository.findById(learnerId);
    }

    // Get all learners
    public Iterable<learner_entity> getAllLearners() {
        return learnerRepository.findAll();
    }

    // Delete a learner by ID
    public void deleteLearner(String learnerId) {
        learnerRepository.deleteById(learnerId);
    }

    // Check if learner exists by ID
    public boolean existsById(String learnerId) {
        return learnerRepository.existsById(learnerId);
    }
}
