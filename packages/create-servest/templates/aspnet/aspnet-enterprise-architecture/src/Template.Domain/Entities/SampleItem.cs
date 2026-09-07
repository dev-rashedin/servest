using Template.Domain.Common;
using Template.Domain.Enums;

namespace Template.Domain.Entities;

public class SampleItem : BaseAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public SampleStatus Status { get; set; } = SampleStatus.Pending;
}
