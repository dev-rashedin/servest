using MediatR;
using Template.Application.Common.Interfaces;
using Template.Application.Common.Models;
using Template.Application.Features.SampleItems.DTOs;
using Template.Domain.Entities;

namespace Template.Application.Features.SampleItems.Commands.CreateSampleItem;

public record CreateSampleItemCommand(string Title, string? Description) : IRequest<Result<SampleItemDto>>;

public class CreateSampleItemCommandHandler : IRequestHandler<CreateSampleItemCommand, Result<SampleItemDto>>
{
    private readonly IApplicationDbContext _context;

    public CreateSampleItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<SampleItemDto>> Handle(CreateSampleItemCommand request, CancellationToken cancellationToken)
    {
        var entity = new SampleItem
        {
            Title = request.Title,
            Description = request.Description
        };

        _context.SampleItems.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        var dto = new SampleItemDto(entity.Id, entity.Title, entity.Description, entity.Status, entity.CreatedAt);
        return Result<SampleItemDto>.Success(dto);
    }
}
