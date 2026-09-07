using Microsoft.EntityFrameworkCore;
using Template.Domain.Entities;

namespace Template.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<SampleItem> SampleItems { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
