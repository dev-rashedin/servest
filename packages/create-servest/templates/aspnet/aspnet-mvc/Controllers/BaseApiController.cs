using Microsoft.AspNetCore.Mvc;

namespace Template.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
}
