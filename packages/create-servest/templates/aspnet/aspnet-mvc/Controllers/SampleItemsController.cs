using Microsoft.AspNetCore.Mvc;
using Template.DTOs;
using Template.Services;

namespace Template.Controllers;

public class SampleItemsController : BaseApiController
{
    private readonly ISampleItemService _service;

    public SampleItemsController(ISampleItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<SampleItemDto>>> GetAll(CancellationToken cancellationToken)
    {
        var items = await _service.GetAllAsync(cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<SampleItemDto>> Create([FromBody] CreateSampleItemDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
        {
            return BadRequest("Title is required.");
        }

        var item = await _service.CreateAsync(dto, cancellationToken);
        return Ok(item);
    }
}
