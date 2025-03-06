import { IMeetingAttendee } from "./IMeetingAttendee";

export interface IMeeting {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  meetingAttendees?: IMeetingAttendee[]; // Corrected property name
}
  // export interface IAttendees {
  //   id:number,
  //   name: string,
  //   email: string,
  //   password: string,
  //   attendees: IMeetingAttendees
  // }

  // export interface IMeetingAttendees {
  //   // meetingId: number,
  //   // email: string,
  //   attendeeId: number,
  // }
  