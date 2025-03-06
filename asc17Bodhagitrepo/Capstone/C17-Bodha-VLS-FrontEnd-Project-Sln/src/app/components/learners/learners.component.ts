// src/app/components/learners/learners.component.ts
import { Component } from '@angular/core';
import { LearnersService } from '../../services/learners.service';
import { Learner } from '../../models/learner.model';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.css'],
})
export class LearnersComponent {
  learners: Learner[] = [];
  learnerToEdit: Learner | null = null;
  searchQuery: string = '';

  constructor(private learnersService: LearnersService) {
    this.learnersService.learners$.subscribe((data) => {
      this.learners = data;
    });
  }

  addLearner(learnerData: { learnerName: string, email: string, phone: string, course: string }) {
    const newLearner: Learner = {
      id: 'L' + (1000 + this.learners.length + 1), // Auto-generate ID
      name: learnerData.learnerName,
      email: learnerData.email,
      phone: learnerData.phone,
      course: learnerData.course,
    };

    this.learnersService.addLearner(newLearner);
  }

  deleteLearner(learnerId: string) {
    this.learnersService.deleteLearner(learnerId);
  }

  updateLearner() {
    if (this.learnerToEdit) {
      this.learnersService.updateLearner(this.learnerToEdit);
      this.learnerToEdit = null; // Reset after update
    }
  }

  setLearnerToEdit(learner: Learner) {
    this.learnerToEdit = { ...learner }; // Create a copy to avoid direct mutations
  }

  filterLearners() {
    return this.learners.filter(learner =>
      learner.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      learner.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      learner.course.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
