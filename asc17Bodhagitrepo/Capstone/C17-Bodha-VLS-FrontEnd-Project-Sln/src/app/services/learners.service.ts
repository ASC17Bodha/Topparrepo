// src/app/services/learners.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Learner } from '../models/learner.model';

@Injectable({
  providedIn: 'root',
})
export class LearnersService {
  private learners = new BehaviorSubject<Learner[]>([]);
  learners$ = this.learners.asObservable();

  addLearner(learner: Learner) {
    const currentLearners = this.learners.getValue();
    this.learners.next([...currentLearners, learner]);
  }

  deleteLearner(learnerId: string) {
    const currentLearners = this.learners.getValue();
    this.learners.next(currentLearners.filter((l) => l.id !== learnerId));
  }

  updateLearner(updatedLearner: Learner) {
    const currentLearners = this.learners.getValue();
    const learnerIndex = currentLearners.findIndex(l => l.id === updatedLearner.id);
    if (learnerIndex !== -1) {
      currentLearners[learnerIndex] = updatedLearner;
      this.learners.next([...currentLearners]);
    }
  }

  getLearners() {
    return this.learners.getValue();
  }
}
