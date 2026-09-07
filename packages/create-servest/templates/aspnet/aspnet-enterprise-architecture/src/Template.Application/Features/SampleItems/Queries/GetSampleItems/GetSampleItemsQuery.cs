using MediatR;
using Microsoft.EntityFrameworkCore;
using Template.Application.Common.Interfaces;
using Template.Application.Common.Models;
using Template.Application.Features.SampleItems.DTOs;

namespace Template.Application.Features.SampleItems.Queries.GetSampleItems;

public record GetSampleItemsQuery : IRequest<Result<List<SampleItemDto>>>;

public class GetSampleItemsQueryHandler : IRequestHandler<GetSampleItemsQuery, Result<List<SampleItemDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetSampleItemsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<SampleItemDto>>> Handle(GetSampleItemsQuery request, CancellationToken cancellationToken)
    {
        var items = await _context.SampleItems
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new SampleItemDto(x.Id, x.Title, x.Description, x.Status, x.CreatedAt))
            .ToListAsync(cancellationToken);

        return Result<List<SampleItemDto>>.Success(items);
    }
}
