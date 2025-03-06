import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService {
  private registrations = new BehaviorSubject<Registration[]>([]);
  registrations$ = this.registrations.asObservable();

  addRegistration(registration: Registration) {
    const currentRegistrations = this.registrations.getValue();
    this.registrations.next([...currentRegistrations, registration]);
  }

  deleteRegistration(registrationId: string) {
    const currentRegistrations = this.registrations.getValue();
    this.registrations.next(
      currentRegistrations.filter((r) => r.id !== registrationId)
    );
  }
}
