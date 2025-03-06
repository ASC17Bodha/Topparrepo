import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastComponent } from '../../../common/toast/toast.component';
import { ToastService } from '../../../common/toast.service';
import { SessionsService } from '../../sessions.service';
import { ISession } from '../../models/ISession';

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [FormsModule,JsonPipe,ReactiveFormsModule],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.scss'
})
export class AddSessionComponent {
  addSessionForm = new FormGroup({
      sequenceId: new FormControl([
          '', // initial value of the input
          [
              // the list of validators
              Validators.required,
              Validators.pattern('\\d+'),
          ],
      ]),
      name: new FormControl([
          '',
          [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
      ]),
      speaker: new FormControl([
          '',
          [
              Validators.required,
              Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
          ],
      ]),
      duration: new FormControl([
          '',
          [Validators.required, Validators.min(0.5), Validators.max(10)],
      ]),
      level: new FormControl(['', [Validators.required]]),
      abstract: new FormControl([
          '',
          [Validators.required, Validators.minLength(2)],
      ]),
  });
  
  // helper accessor methods
  get sequenceId() {
      return this.addSessionForm.get('sequenceId') as FormControl;
  }
  
  get name() {
      return this.addSessionForm.get('name') as FormControl;
  }
  
  get speaker() {
      return this.addSessionForm.get('speaker') as FormControl;
  }
  
  get duration() {
      return this.addSessionForm.get('duration') as FormControl;
  }
  
  get level() {
      return this.addSessionForm.get('level') as FormControl;
  }
  
  get abstract() {
      return this.addSessionForm.get('abstract') as FormControl;
  }
  
  constructor(
      private activatedRoute: ActivatedRoute,
      private sessionsService: SessionsService,
      private router: Router,
      private toastService: ToastService
  ) {}

 durationAndLevel(form: AbstractControl) {
    const durationStr = (form.get('duration') as AbstractControl).value;
    const duration = +durationStr;
    const level = (form.get('level') as AbstractControl).value;
    
    // if valid -> return null
    // if invalid -> return an object with the details of the error. Further this object should have the property called `durationAndLevel`
    if (durationStr === '' || level === '') {
        return null;
    }
    
    if (level === 'Basic') {
        return null;
    }
    
    if (level === 'Intermediate') {
        if (duration >= 2) {
            return null;
        }
        
        // error
        return {
            durationAndLevel: 'Intermediate level session should be at least 2 hours in duration',
        };
    }

    if (level === 'Advanced') {
        if (duration >= 3) {
            return null;
        }

        // error
        return {
            durationAndLevel: 'Advanced level session should be at least 3 hours in duration',
        };
    }

    return null;
}

  // NOTE: Only the signature of this method changes fron the template-driven code written earlier.
  addSession(addSessionForm: NgForm) {
    const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
        'id'
    ) as string);

    const newSession = {
        ...addSessionForm.value,
        workshopId: id,
        upvoteCount: 0,
        sequenceId: +addSessionForm.value.sequenceId,
        duration: +addSessionForm.value.duration,
    } as Omit<ISession, 'id'>;

    console.log(newSession);
    
    this.sessionsService.addSession(newSession).subscribe({
        next: (addedSession) => {
            alert(`Added session with id = ${addedSession.id}`);
            
            // You can also use navigateByUrl()
            this.router.navigate(['/workshops', id]);
        },
    });
}
}