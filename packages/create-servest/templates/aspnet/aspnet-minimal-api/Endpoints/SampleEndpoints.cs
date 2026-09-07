using Microsoft.EntityFrameworkCore;
using Template.Data;
using Template.DTOs;
using Template.Models;

namespace Template.Endpoints;

public static class SampleEndpoints
{
    public static RouteGroupBuilder MapSampleEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/sampleitems")
            .WithTags("SampleItems");

        group.MapGet("/", async (ApplicationDbContext db, CancellationToken ct) =>
        {
            var items = await db.SampleItems
                .AsNoTracking()
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new SampleItemDto(x.Id, x.Title, x.Description, x.CreatedAt))
                .ToListAsync(ct);

            return Results.Ok(items);
        })
        .WithName("GetSampleItems")
        .Produces<List<SampleItemDto>>(StatusCodes.Status200OK);

        group.MapPost("/", async (CreateSampleItemDto dto, ApplicationDbContext db, CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                return Results.BadRequest(new { Message = "Title is required." });
            }

            var entity = new SampleItem
            {
                Title = dto.Title,
                Description = dto.Description
            };

            db.SampleItems.Add(entity);
            await db.SaveChangesAsync(ct);

            var result = new SampleItemDto(entity.Id, entity.Title, entity.Description, entity.CreatedAt);
            return Results.Created($"/api/sampleitems/{entity.Id}", result);
        })
        .WithName("CreateSampleItem")
        .Produces<SampleItemDto>(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status400BadRequest);

        return group;
    }
}
