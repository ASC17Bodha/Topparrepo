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

import com.example.caps_project.entity.learner_entity;
import com.example.caps_project.service.learner_service;

@RestController
@RequestMapping("/api/learner")
public class learner_controller {

    @Autowired
    private learner_service learnerService;

    // Create or Update a learner
    @PostMapping
    public ResponseEntity<learner_entity> createOrUpdateLearner(@RequestBody learner_entity learner) {
        learner_entity savedLearner = learnerService.saveLearner(learner);
        return new ResponseEntity<>(savedLearner, HttpStatus.CREATED);
    }

    // Get a learner by ID
    @GetMapping("/{learnerId}")
    public ResponseEntity<learner_entity> getLearnerById(@PathVariable String learnerId) {
        Optional<learner_entity> learner = learnerService.getLearnerById(learnerId);
        return learner.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all learners
    @GetMapping
    public ResponseEntity<Iterable<learner_entity>> getAllLearners() {
        Iterable<learner_entity> learners = learnerService.getAllLearners();
        return ResponseEntity.ok(learners);
    }

    // Delete a learner by ID
    @DeleteMapping("/{learnerId}")
    public ResponseEntity<Void> deleteLearner(@PathVariable String learnerId) {
        if (learnerService.existsById(learnerId)) {
            learnerService.deleteLearner(learnerId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    @PutMapping("/{learnerId}")
    public ResponseEntity<learner_entity> updateLearner(@PathVariable String learnerId, @RequestBody learner_entity learner) {
        Optional<learner_entity> existingLearner = learnerService.getLearnerById(learnerId);

        if (existingLearner.isPresent()) {
            learner.setLearnerId(learnerId);  // Ensure the learner's ID matches the URL path
            learner_entity updatedLearner = learnerService.saveLearner(learner);
            return new ResponseEntity<>(updatedLearner, HttpStatus.OK);
        }

        return ResponseEntity.notFound().build();
    }
}
