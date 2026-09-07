using Microsoft.Extensions.DependencyInjection;
using Template.Application.Common.Interfaces;
using Template.Infrastructure.Services;

namespace Template.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();
        return services;
    }
}
