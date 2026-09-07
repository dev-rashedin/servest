using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Template.Application.Common.Models;
using Template.Application.Features.SampleItems.Commands.CreateSampleItem;
using Template.Application.Features.SampleItems.DTOs;
using Xunit;

namespace Template.IntegrationTests.Controllers;

public class SampleItemsControllerTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public SampleItemsControllerTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ShouldReturnSuccessStatusCode()
    {
        var response = await _client.GetAsync("/api/sampleitems");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Create_ValidCommand_ShouldReturnSuccess()
    {
        var command = new CreateSampleItemCommand("Integration Test Item", "Description from test");
        var response = await _client.PostAsJsonAsync("/api/sampleitems", command);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var result = await response.Content.ReadFromJsonAsync<Result<SampleItemDto>>();
        result.Should().NotBeNull();
        result!.Succeeded.Should().BeTrue();
        result.Data!.Title.Should().Be("Integration Test Item");
    }
}
