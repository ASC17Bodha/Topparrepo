using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MeetingsApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Attendee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meetings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MeetingAttendee",
                columns: table => new
                {
                    MeetingId = table.Column<int>(type: "INTEGER", nullable: false),
                    AttendeeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeetingAttendee", x => new { x.MeetingId, x.AttendeeId });
                    table.ForeignKey(
                        name: "FK_MeetingAttendee_Attendee_AttendeeId",
                        column: x => x.AttendeeId,
                        principalTable: "Attendee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MeetingAttendee_Meetings_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meetings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Attendee",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "gaurav@123.com", "Gaurav", "gaurav@123" },
                    { 2, "gaurav@123.com", "Gaurav123", "gaurav@123" }
                });

            migrationBuilder.InsertData(
                table: "Meetings",
                columns: new[] { "Id", "Date", "Description", "EndTime", "StartTime", "Title" },
                values: new object[,]
                {
                    { 1, new DateOnly(2020, 1, 1), "This is meeting 1", new TimeOnly(13, 20, 0), new TimeOnly(10, 0, 0), "Meeting 1" },
                    { 2, new DateOnly(2024, 1, 11), "daily sync of meet", new TimeOnly(16, 42, 0), new TimeOnly(14, 42, 0), "daily sync up" },
                    { 3, new DateOnly(2026, 1, 3), "daily sync of meet", new TimeOnly(16, 42, 0), new TimeOnly(14, 42, 0), "daily sync up" }
                });

            migrationBuilder.InsertData(
                table: "MeetingAttendee",
                columns: new[] { "AttendeeId", "MeetingId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeetingAttendee_AttendeeId",
                table: "MeetingAttendee",
                column: "AttendeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeetingAttendee");

            migrationBuilder.DropTable(
                name: "Attendee");

            migrationBuilder.DropTable(
                name: "Meetings");
        }
    }
}
