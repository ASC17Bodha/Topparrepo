import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviews = new BehaviorSubject<Review[]>([]);
  reviews$ = this.reviews.asObservable();

  addReview(review: Review) {
    const currentReviews = this.reviews.getValue();
    this.reviews.next([...currentReviews, review]);
  }

  deleteReview(reviewId: string) {
    const currentReviews = this.reviews.getValue();
    this.reviews.next(
      currentReviews.filter((review) => review.id !== reviewId)
    );
  }
}
