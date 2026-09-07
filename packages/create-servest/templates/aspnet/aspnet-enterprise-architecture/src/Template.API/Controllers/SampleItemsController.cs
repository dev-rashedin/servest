using Microsoft.AspNetCore.Mvc;
using Template.Application.Common.Models;
using Template.Application.Features.SampleItems.Commands.CreateSampleItem;
using Template.Application.Features.SampleItems.DTOs;
using Template.Application.Features.SampleItems.Queries.GetSampleItems;

namespace Template.API.Controllers;

public class SampleItemsController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(typeof(Result<List<SampleItemDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(new GetSampleItemsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Result<SampleItemDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateSampleItemCommand command, CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(command, cancellationToken);
        return Ok(result);
    }
}
