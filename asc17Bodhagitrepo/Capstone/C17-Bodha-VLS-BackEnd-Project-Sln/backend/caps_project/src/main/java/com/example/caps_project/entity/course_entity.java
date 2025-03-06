package com.example.caps_project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "COURSES")
public class

course_entity {

    @Id
    @Column(name = "COURSE_ID")
    private String courseId;

    @Column(name = "NAME", length = 50, nullable = false)
    private String name;

    @Column(name = "START_DATE", length = 50, nullable = false)
    private String startDate;

    @Column(name = "DURATION", nullable = false)
    private int duration;

    @Column(name = "DESCRIPTION", length = 100, nullable = false)
    private String description;

//    @ManyToOne
//    @JoinColumn(name = "ASSIGNED_TO", referencedColumnName = "AUTHOR_ID", nullable = false)
//    private author_entity assignedTo;

    // Default constructor
    public course_entity() {
    }

    // Parameterized constructor
    public course_entity(String courseId, String name, String startDate, int duration, String description, author_entity assignedTo) {
        this.courseId = courseId;
        this.name = name;
        this.startDate = startDate;
        this.duration = duration;
        this.description = description;
//        this.assignedTo = assignedTo;
    }

    // Getters and setters
    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public author_entity getAssignedTo() {
//        return assignedTo;
//    }

//    public void setAssignedTo(author_entity assignedTo) {
//        this.assignedTo = assignedTo;
//    }
}
