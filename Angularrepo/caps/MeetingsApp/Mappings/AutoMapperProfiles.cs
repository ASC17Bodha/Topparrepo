﻿using AutoMapper;
using MeetingsApp.Models.Domain;
using MeetingsApp.Models.DTO;

namespace MeetingsApp.Mappings;

public class AutoMapperProfiles:Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Meeting, MeetingsDto>().ReverseMap();
        CreateMap<Attendee,AttendeesDto>().ReverseMap();
        //CreateMap<MeetingAttendee, Attendee>();
        CreateMap<MeetingAttendee, MeetingAttendeeDto>().ReverseMap();
        //CreateMap<MeetingAttendeeDto, MeetingAttendeeDtonew>().ReverseMap();
        
    }
}
