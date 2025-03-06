package com.example.caps_project.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;

@Entity
@Table(name = "AUTHORS")
public class author_entity {


    @Id
    @Column(name = "AUTHOR_ID")
    private String authorId;

    @Column(name = "NAME", length = 50, nullable = false)
    private String name;

    @Column(name = "EMAIL", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "PHONE", length = 15, nullable = false)
    private String phone;

    @Column(name = "BIO_GRAPHY", length = 100, nullable = false)
    private String biography;

    // Default constructor
    public author_entity() {
    }

    // Parameterized constructor
    @JsonCreator
    public author_entity(String authorId, String name, String email, String phone, String biography) {
        this.authorId = authorId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.biography = biography;
    }

    // Getters and setters
    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
}
