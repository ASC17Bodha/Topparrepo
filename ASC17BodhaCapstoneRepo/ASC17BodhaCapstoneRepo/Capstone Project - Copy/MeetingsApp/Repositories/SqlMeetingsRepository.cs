﻿using Microsoft.EntityFrameworkCore;
using MeetingsApp.Data;
using MeetingsApp.Models.Domain;

namespace MeetingsApp.Repositories;

public class SqlMeetingsRepository :IMeetingsRepository
{
    private readonly ApplicationDbContext _db;

    public SqlMeetingsRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<Meeting>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
        string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
    {
        var query = _db.Meetings.AsQueryable();

        // Filtering
        if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
        {
            if (filterOn.Equals("Title", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(m => m.Title.ToUpper().Contains(filterQuery.ToUpper()));
            }
            else if (filterOn.Equals("Description", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(m => m.Description.ToUpper().Contains(filterQuery.ToUpper()));
            }
        }

        // Sorting
        if (!string.IsNullOrWhiteSpace(sortBy))
        {
            if (sortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
            {
                query = isAscending ? query.OrderBy(m => m.Title) : query.OrderByDescending(m => m.Title);
            }
            else if (sortBy.Equals("Date", StringComparison.OrdinalIgnoreCase))
            {
                query = isAscending ? query.OrderBy(m => m.Date) : query.OrderByDescending(m => m.Date);
            }
        }

        
        var skipResults = (pageNumber - 1) * pageSize;
        query = query.Skip(skipResults).Take(pageSize);

        return await query.ToListAsync();
    }

    public async Task<Meeting?> GetByIdAsync(int id)
    {
        return await _db.Meetings.Include(m => m.MeetingAttendees)
            .ThenInclude(ma => ma.Attendee)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<Meeting> CreateAsync(Meeting meeting)
    {
        await _db.Meetings.AddAsync(meeting);
        await _db.SaveChangesAsync();
        return meeting;
    }

    public async Task<Meeting?> UpdateAsync(int id, Meeting meeting)
    {
        var existingMeeting = await _db.Meetings.FirstOrDefaultAsync(m => m.Id == id);

        if (existingMeeting == null) return null;

        existingMeeting.Title = meeting.Title;
        existingMeeting.Description = meeting.Description;
        existingMeeting.Date = meeting.Date;
        existingMeeting.StartTime = meeting.StartTime;
        existingMeeting.EndTime = meeting.EndTime;
        existingMeeting.Attendees = meeting.Attendees;

        await _db.SaveChangesAsync();
        return existingMeeting;
    }

    public async Task<Meeting?> DeleteAsync(int id)
    {
        var existingMeeting = await _db.Meetings.FirstOrDefaultAsync(m => m.Id == id);

        if (existingMeeting == null) return null;

        _db.Meetings.Remove(existingMeeting);
        await _db.SaveChangesAsync();
        return existingMeeting;
    }


    public async Task<List<Meeting>> GetMeetingsByDateRangeAsync(string timeFrame)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var currentTime = TimeOnly.FromDateTime(DateTime.Now);

        var query = _db.Meetings.AsQueryable();

        switch (timeFrame.ToLower())
        {
            case "past":
                query = query.Where(m => m.Date < today ||
                    (m.Date == today && m.EndTime < currentTime));
                break;

            case "present":
                query = query.Where(m => m.Date == today &&
                    m.StartTime <= currentTime &&
                    m.EndTime >= currentTime);
                break;

            case "future":
                query = query.Where(m => m.Date > today ||
                    (m.Date == today && m.StartTime > currentTime));
                break;
        }

        return await query.ToListAsync();
    }


    public async Task<bool> AddAttendeeToMeetingAsync(int meetingId, int attendeeId)
    {
        var meeting = await _db.Meetings.FindAsync(meetingId);
        var attendee = await _db.Attendee.FindAsync(attendeeId);

        if (meeting == null || attendee == null)
            return false;

        var meetingAttendee = new MeetingAttendee
        {
            MeetingId = meetingId,
            AttendeeId = attendeeId
        };

        await _db.Set<MeetingAttendee>().AddAsync(meetingAttendee);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveAttendeeFromMeetingAsync(int meetingId, int attendeeId)
    {
        var meetingAttendee = await _db.Set<MeetingAttendee>()
            .FirstOrDefaultAsync(ma => ma.MeetingId == meetingId && ma.AttendeeId == attendeeId);

        if (meetingAttendee == null)
            return false;

        _db.Set<MeetingAttendee>().Remove(meetingAttendee);
        await _db.SaveChangesAsync();
        return true;
    }

    public List<string> ProcessAttendeesList(string attendees)
    {
        if (string.IsNullOrWhiteSpace(attendees))
            return new List<string>();

        return attendees.Split(", ", StringSplitOptions.RemoveEmptyEntries).ToList();
    }

    public async Task<List<Meeting>> GetMeetingsByAttendeeEmailAsync(string email)
    {
        var allMeetings = await GetAllAsync();
        var meetingsWithAttendee = allMeetings.Where(meeting =>
        {
            var attendeesList = ProcessAttendeesList(meeting.Attendees);
            return attendeesList.Contains(email);
        }).ToList();

        return meetingsWithAttendee;
    }
    



}
