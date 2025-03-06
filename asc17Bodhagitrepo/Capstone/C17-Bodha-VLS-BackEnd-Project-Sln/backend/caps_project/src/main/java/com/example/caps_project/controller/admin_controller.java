package com.example.caps_project.controller;

import com.example.caps_project.entity.admin_entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.caps_project.service.admin_service;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class admin_controller {

    @Autowired
    private admin_service adminService;

    // Create or Update an admin
    @PostMapping
    public ResponseEntity<admin_entity> createOrUpdateAdmin(@RequestBody admin_entity admin) {
        admin_entity savedAdmin = adminService.saveAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    // Get an admin by ID
    @GetMapping("/{aId}")
    public ResponseEntity<admin_entity> getAdminById(@PathVariable String aId) {
        Optional<admin_entity> admin = adminService.getAdminById(aId);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all admins
    @GetMapping
    public ResponseEntity<Iterable<admin_entity>> getAllAdmins() {
        Iterable<admin_entity> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    // Delete an admin by ID
    @DeleteMapping("/{aId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String aId) {
        if (adminService.existsById(aId)) {
            adminService.deleteAdmin(aId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Update an existing admin
    @PutMapping("/{aId}")
    public ResponseEntity<admin_entity> updateAdmin(@PathVariable String aId, @RequestBody admin_entity admin) {
        Optional<admin_entity> existingAdmin = adminService.getAdminById(aId);

        if (existingAdmin.isPresent()) {
            admin.setaId(aId); // Ensure the ID matches the URL path
            admin_entity updatedAdmin = adminService.saveAdmin(admin);
            return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }
}
