using Microsoft.EntityFrameworkCore;
using Template.Data;
using Template.DTOs;
using Template.Models;

namespace Template.Services;

public class SampleItemService : ISampleItemService
{
    private readonly ApplicationDbContext _context;

    public SampleItemService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<SampleItemDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SampleItems
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new SampleItemDto(x.Id, x.Title, x.Description, x.CreatedAt))
            .ToListAsync(cancellationToken);
    }

    public async Task<SampleItemDto> CreateAsync(CreateSampleItemDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new SampleItem
        {
            Title = dto.Title,
            Description = dto.Description
        };

        _context.SampleItems.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return new SampleItemDto(entity.Id, entity.Title, entity.Description, entity.CreatedAt);
    }
}
