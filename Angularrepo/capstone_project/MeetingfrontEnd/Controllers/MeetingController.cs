using Microsoft.AspNetCore.Mvc;
using MeetingfrontEnd.Models;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace MeetingfrontEnd.Controllers;

public class MeetingController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MeetingController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    // GET: Meetings/Create
    public IActionResult CreateMeeting()
    {
        return View();
    }

    // POST: Meetings/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Meeting meeting)
    {
        if (!ModelState.IsValid)
        {
            return View(meeting);
        }

        var client = _httpClientFactory.CreateClient("MeetingsApi");
        var json = JsonSerializer.Serialize(meeting);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await client.PostAsync("api/Meetings", content);

        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }

        ModelState.AddModelError(string.Empty, "Error creating meeting. Please try again.");
        return View(meeting);
    }

    public IActionResult Success()
    {
        return View();
    }
    // Add to MeetingsController.cs
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var client = _httpClientFactory.CreateClient("MeetingsApi");
        var response = await client.GetAsync("api/Meetings");

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var meetings = JsonSerializer.Deserialize<List<Meeting>>(content, options);
            return View(meetings);
        }

        return View(new List<Meeting>());
    }
    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var client = _httpClientFactory.CreateClient("MeetingsApi");
        var response = await client.GetAsync($"api/Meetings/{id}");

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var meeting = JsonSerializer.Deserialize<Meeting>(content, options);
            return View(meeting);
        }

        return NotFound();
    }
}