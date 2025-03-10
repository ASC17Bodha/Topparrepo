﻿using MeetingsApp.Models.Domain;
using Microsoft.EntityFrameworkCore;
namespace MeetingsApp.Data;

public class ApplicationDbContext:DbContext
{
    public DbSet<Meeting> Meetings { get; set; }
    public DbSet<Attendee> Attendee { get; set; }
    public DbSet<MeetingAttendee> MeetingAttendee { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //modelBuilder.Entity<Meeting>();


        modelBuilder.Entity<MeetingAttendee>()
            .HasKey(ma => new { ma.MeetingId, ma.AttendeeId });

        modelBuilder.Entity<MeetingAttendee>()
            .HasOne(ma => ma.Meeting)
            .WithMany(m => m.MeetingAttendees)
            .HasForeignKey(ma => ma.MeetingId);

        modelBuilder.Entity<MeetingAttendee>()
            .HasOne(ma => ma.Attendee)
            .WithMany(a => a.Meeting)
            .HasForeignKey(ma => ma.AttendeeId);

        var meetings = new List<Meeting>
        {
            new Meeting
            {
                Id = 1,

               Title = "Meeting 1",
                Date = DateOnly.Parse("01-01-2020"),
                StartTime = TimeOnly.Parse("10:00"),
                EndTime = TimeOnly.Parse("13:20"),
                Description = "This is meeting 1",
                
            },
            new Meeting
            {
                Id = 2,
                Title = "daily sync up",
                Date = DateOnly.Parse("01-11-2024"),
                StartTime = TimeOnly.Parse("14:42"),
                EndTime = TimeOnly.Parse("16:42"),
                Description = "daily sync of meet"
            },
            new Meeting
            {
                Id = 3,
                Title = "daily sync up",
                Date = DateOnly.Parse("01-03-2026"),
                StartTime = TimeOnly.Parse("14:42"),
                EndTime = TimeOnly.Parse("16:42"),
                Description = "daily sync of meet"
            }
        };

        modelBuilder.Entity<Meeting>().HasData(meetings);

        var users = new List<Attendee>
        {
            new Attendee
            {
                Id = 1,
                Name="Gaurav",
                Email="gaurav@123.com",
                Password="gaurav@123"

            },
            new Attendee
            {
                Id = 2,
                Name="Gaurav123",
                Email="gaurav@123.com",
                Password="gaurav@123"

            }
        };
        modelBuilder.Entity<Attendee>().HasData(users);

        var MeetingAttendees = new List<MeetingAttendee>
        {
            new MeetingAttendee
            {
                AttendeeId = 1,
                MeetingId=1
            },
            new MeetingAttendee
            {
                AttendeeId=2,
                MeetingId=2
            }
        };
        modelBuilder.Entity<MeetingAttendee>().HasData(MeetingAttendees);
        
    }
}