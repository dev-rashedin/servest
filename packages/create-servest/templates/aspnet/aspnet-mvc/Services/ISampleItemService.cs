using Template.DTOs;

namespace Template.Services;

public interface ISampleItemService
{
    Task<List<SampleItemDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<SampleItemDto> CreateAsync(CreateSampleItemDto dto, CancellationToken cancellationToken = default);
}
