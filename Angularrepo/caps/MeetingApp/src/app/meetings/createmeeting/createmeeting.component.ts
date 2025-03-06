import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMeeting } from '../../models/IMeetings';
import { IAttendees } from '../../models/IAttendee';
import { IMeetingAttendee } from '../../models/IMeetingAttendee';
import { MeetingsService } from '../meetings.service';
import { AttendeesService } from '../../attendees/attendees.service';

@Component({
  selector: 'app-createmeeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.scss']
})
export class CreatemeetingComponent {
  meeting: IMeeting = {
    id: 0,
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    meetingAttendees: [] // Initialize as empty array
  };

  AllAttendees: IAttendees[] = [];
  selectedAttendeeIds: number[] = []; // Holds selected attendee IDs

  constructor(private as: AttendeesService, private ms: MeetingsService) {
    this.as.getAttendees().subscribe(data => {
      this.AllAttendees = data;
    });
  }

  createMeeting() {
    // Map selected attendee IDs to meetingAttendees
    this.meeting.meetingAttendees = this.selectedAttendeeIds.map(id => ({ attendeeId: id }));

    // Append seconds to startTime and endTime
    const meetingToSend = {
      ...this.meeting,
      startTime: this.meeting.startTime + ':00',
      endTime: this.meeting.endTime + ':00'
    };

    this.ms.addMeeting(meetingToSend).subscribe(data => {
      console.log('Meeting created:', data);
      // Handle success (e.g., navigation or reset form)
    });
  }
}