// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';
// import { IMeeting } from '../../models/IMeetings'
// import { MeetingsService } from '../meetings.service';
// import { Router } from '@angular/router';
// import { AttendeesService } from '../../attendees/attendees.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-createmeeting',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './createmeeting.component.html',
//   styleUrl: './createmeeting.component.scss'
// })
// export class CreatemeetingComponent {
//   meeting: IMeeting = {
//     id: 0,
//     title: '',
//     date: '',
//     startTime: '',
//     endTime: '',
//     description: '',
//     attendees: ''
//   };
//   attendeesList: any[] = [];
//   selecteddAttendees: any[] = [];

//   currentuser: string = '';

  


//   onAttendeesChange(event: any) {
//     const selectedOptions=Array.from(event.target.selectedOptions,(option:any) => option.value);
//     this.meeting.attendees = selectedOptions.join(', ');
//     this.meeting.attendees = this.meeting.attendees+', '+this.currentuser;
//   }


//   constructor(private meetingService: MeetingsService, private router: Router, private attendeeService: AttendeesService,as:AuthService) {
//     this.loadAttendees();
//     this.currentuser=as.getCurrentUser().email;
//     console.log(this.currentuser);
//   }


//   loadAttendees() {
//     this.attendeeService.getAttendees().subscribe({
//       next: (attendees) => {
//         this.attendeesList = attendees;
//       },
//       error: (error) => {
//         console.error('Error loading attendees:', error);
//       }
//     });
//   }

//   // createMeeting(form: NgForm) {
    
//   //   if (form.valid) {
//   //     this.meetingService.addMeeting(this.meeting).subscribe({
//   //       next: (response) => {
//   //         this.router.navigate(['/meetings']);
//   //       },
//   //       error: (error) => {
//   //         console.error('Error creating meeting:', error);
//   //       }
//   //     });
//   //   }
//   // }
//   createMeeting(form: NgForm) {
//     form.form.markAllAsTouched();
//     if (form.valid) {
//       // Format date to YYYY-MM-DD
//       const formattedDate = new Date(this.meeting.date).toISOString().split('T')[0];
      
//       // Format times to HH:mm:ss
//       const formattedStartTime = this.meeting.startTime + ':00';
//       const formattedEndTime = this.meeting.endTime + ':00';
  
//       const formattedMeeting = {
//         ...this.meeting,
//         date: formattedDate,
//         startTime: formattedStartTime,
//         endTime: formattedEndTime
//       };
  
//       this.meetingService.addMeeting(formattedMeeting).subscribe({
//         next: (response) => {
//           this.router.navigate(['/showmeeting']);
//         },
//         error: (error) => {
//           console.error('Error creating meeting:', error);
//         }
//       });
//     }
//   }
  

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IMeeting } from '../../models/IMeetings'
import { MeetingsService } from '../meetings.service';
import { Router } from '@angular/router';
import { AttendeesService } from '../../attendees/attendees.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createmeeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createmeeting.component.html',
  styleUrl: './createmeeting.component.scss'
})
export class CreatemeetingComponent {
  meeting: IMeeting = {
    id: 0,
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    attendees: ''
  };
  attendeesList: any[] = [];
  selecteddAttendees: any[] = [];
  currentuser: string = '';
  minDate: string;
  minTime: string;

  onAttendeesChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.meeting.attendees = selectedOptions.join(', ');
    this.meeting.attendees = this.meeting.attendees + ', ' + this.currentuser;
  }

  constructor(private meetingService: MeetingsService, private router: Router, private attendeeService: AttendeesService, as: AuthService) {
    this.loadAttendees();
    this.currentuser = as.getCurrentUser().email;
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0];
    this.minTime = now.toTimeString().slice(0, 5);
  }

  onDateChange() {
    const selectedDate = new Date(this.meeting.date);
    const today = new Date();
    
    if (selectedDate.toDateString() === today.toDateString()) {
      this.minTime = new Date().toTimeString().slice(0, 5);
    } else {
      this.minTime = '00:00';
    }
  }

  loadAttendees() {
    this.attendeeService.getAttendees().subscribe({
      next: (attendees) => {
        this.attendeesList = attendees;
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
      }
    });
  }

  createMeeting(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.valid) {
      const now = new Date();
      const meetingDate = new Date(this.meeting.date);
      const meetingStartTime = new Date(`${this.meeting.date}T${this.meeting.startTime}`);
      const meetingEndTime = new Date(`${this.meeting.date}T${this.meeting.endTime}`);

      if (meetingDate < now) {
        alert('Please select a present or future date');
        return;
      }

      if (meetingStartTime < now) {
        alert('Please select a present or future time');
        return;
      }

      if (meetingEndTime <= meetingStartTime) {
        alert('End time must be after start time');
        return;
      }

      const formattedDate = meetingDate.toISOString().split('T')[0];
      const formattedStartTime = this.meeting.startTime + ':00';
      const formattedEndTime = this.meeting.endTime + ':00';

      const formattedMeeting = {
        ...this.meeting,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime
      };

      this.meetingService.addMeeting(formattedMeeting).subscribe({
        next: (response) => {
          this.router.navigate(['/showmeeting']);
        },
        error: (error) => {
          console.error('Error creating meeting:', error);
        }
      });
    }
  }
}
