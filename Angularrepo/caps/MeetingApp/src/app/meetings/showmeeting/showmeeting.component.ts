import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMeeting } from '../../models/IMeetings';
import { MeetingsService } from '../meetings.service';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AttendeesService } from '../../attendees/attendees.service';
import { ToastService } from '../../common/toast.service';
import { IAttendees } from '../../models/IAttendee';

@Component({
  selector: 'app-showmeeting',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorAlertComponent, NgbDropdown],
  templateUrl: './showmeeting.component.html',
  styleUrl: './showmeeting.component.scss'
})
export class ShowmeetingComponent implements OnInit {
  meetings: IMeeting[] = [];
  AllAttendees: IAttendees[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  filteredMeetings: IMeeting[] = [];

  constructor(
    private meetingService: MeetingsService,
    private attendeesService: AttendeesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.attendeesService.getAttendees().subscribe({
      next: (attendees) => {
        this.AllAttendees = attendees;
        this.loadMeetings();
      },
      error: (err) => {
        this.handleError('Failed to load attendees');
      }
    });
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe({
      next: (meetings) => {
        this.meetings = meetings;
        this.filteredMeetings = [...this.meetings];
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Failed to load meetings');
      }
    });
  }

  getAttendeeName(attendeeId: number): string {
    const attendee = this.AllAttendees.find(a => a.id === attendeeId);
    return attendee ? attendee.name : 'Unknown';
  }

  getAttendeeNames(meeting: IMeeting): string {
    if (!meeting.meetingAttendees?.length) return 'No attendees';
    return meeting.meetingAttendees
      .map(ma => this.AllAttendees.find(a => a.id === ma.attendeeId)?.name || 'Unknown')
      .join(', ');
  }

  removeAttendee(meeting: IMeeting, attendeeId: number) {
    const updatedAttendees = meeting.meetingAttendees?.filter(a => a.attendeeId !== attendeeId) || [];
    const updatedMeeting = { ...meeting, meetingAttendees: updatedAttendees };

    this.meetingService.updateMeeting(updatedMeeting, meeting.id).subscribe({
      next: () => {
        this.toastService.add({
          message: 'Attendee removed successfully',
          className: 'bg-success text-light',
          duration: 3000,
        });
        this.loadMeetings();
      },
      error: (err) => {
        this.handleError('Failed to remove attendee');
      }
    });
  }

  searchMeetings() {
    this.filteredMeetings = this.searchTerm.trim() 
      ? this.meetings.filter(m => 
          m.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          m.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : [...this.meetings];
  }

  deleteMeeting(id: number) {
    this.meetingService.deleteMeeting(id).subscribe({
      next: () => {
        this.toastService.add({
          message: 'Meeting deleted successfully',
          className: 'bg-success text-light',
          duration: 3000,
        });
        this.loadMeetings();
      },
      error: (err) => {
        this.toastService.add({
          message: 'Failed to delete meeting',
          className: 'bg-danger text-light',
          duration: 3000,
        });
        console.error(err);
      }
    });
  }

  private handleError(message: string) {
    this.error = message;
    this.loading = false;
    this.toastService.add({
      message,
      className: 'bg-danger text-light',
      duration: 3000,
    });
  }
}