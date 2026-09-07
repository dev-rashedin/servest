using Template.Domain.Enums;

namespace Template.Application.Features.SampleItems.DTOs;

public record SampleItemDto(
    Guid Id,
    string Title,
    string? Description,
    SampleStatus Status,
    DateTime CreatedAt
);
