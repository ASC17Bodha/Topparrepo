package com.example.caps_project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "REVIEW")
public class review_entity {

    @Id
    @Column(name = "R_ID")
    private String rId;  // Changed to String to match VARCHAR(10)

    @Column(name = "REVIEW", length = 100, nullable = false)
    private String review;

    @Column(name = "RATING", nullable = false)
    private int rating;

    @ManyToOne
    @JoinColumn(name = "L_ID", referencedColumnName = "LEARNER_ID", nullable = false)
    private learner_entity learner;

    @ManyToOne
    @JoinColumn(name = "C_ID", referencedColumnName = "COURSE_ID", nullable = false)
    private course_entity course;

    // Default constructor
    public review_entity() {
    }

    // Parameterized constructor
    public review_entity(String rId, String review, int rating, learner_entity learner, course_entity course) {
        this.rId = rId;
        this.review = review;
        this.rating = rating;
        this.learner = learner;
        this.course = course;
    }

    // Getters and setters
    public String getrId() {
        return rId;
    }

    public void setrId(String rId) {
        this.rId = rId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public learner_entity getLearner() {
        return learner;
    }

    public void setLearner(learner_entity learner) {
        this.learner = learner;
    }

    public course_entity getCourse() {
        return course;
    }

    public void setCourse(course_entity course) {
        this.course = course;
    }
}
