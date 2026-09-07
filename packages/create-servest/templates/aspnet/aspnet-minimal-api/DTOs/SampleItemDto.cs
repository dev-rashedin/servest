namespace Template.DTOs;

public record SampleItemDto(Guid Id, string Title, string? Description, DateTime CreatedAt);
public record CreateSampleItemDto(string Title, string? Description);
