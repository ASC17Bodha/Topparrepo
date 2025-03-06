package com.example.caps_project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "LEARNERS")
public class learner_entity {

    @Id
    @Column(name = "LEARNER_ID")
    private String learnerId;

    @Column(name = "NAME", length = 50, nullable = false)
    private String name;

    @Column(name = "PHONE", length = 15, nullable = false)
    private String phone;

    @Column(name = "EMAIL", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "ADDRESS", length = 100, nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "COURSE_ASSIGNED", referencedColumnName = "COURSE_ID", nullable = false)
    private course_entity courseAssigned;

    // Default constructor
    public learner_entity() {
    }

    // Parameterized constructor
    public learner_entity(String learnerId, String name, String phone, String email, String address, course_entity courseAssigned) {
        this.learnerId = learnerId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.courseAssigned = courseAssigned;
    }

    // Getters and setters
    public String getLearnerId() {
        return learnerId;
    }

    public void setLearnerId(String learnerId) {
        this.learnerId = learnerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public course_entity getCourseAssigned() {
        return courseAssigned;
    }

    public void setCourseAssigned(course_entity courseAssigned) {
        this.courseAssigned = courseAssigned;
    }
}
