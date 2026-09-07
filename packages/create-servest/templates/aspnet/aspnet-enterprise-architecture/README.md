# Template - Enterprise Clean Architecture

Production-ready ASP.NET Core Clean Architecture backend with MediatR, FluentValidation, Entity Framework Core, and xUnit test suites.

## 🏗️ Architecture Layers

- **`src/Template.Domain`**: Business entities, Enums, Value Objects, Domain Exceptions (Zero external dependencies).
- **`src/Template.Application`**: Use cases, CQRS Commands/Queries, Behaviors, DTOs, and Service Interfaces.
- **`src/Template.Persistence`**: EF Core `ApplicationDbContext`, Entity Configurations, Migrations, and Repositories.
- **`src/Template.Infrastructure`**: External integrations, Identity/Authentication, and Date/Time providers.
- **`src/Template.API`**: REST Controllers, Middleware, Swagger UI, and Dependency Injection container.
- **`tests/Template.UnitTests`**: xUnit unit testing with Moq & FluentAssertions.
- **`tests/Template.IntegrationTests`**: xUnit integration testing with `WebApplicationFactory`.

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 or .NET 9.0 SDK](https://dotnet.microsoft.com/download)

### 1. Restore & Build

```bash
dotnet restore
dotnet build
```

### 2. Run Automated Tests

```bash
dotnet test
```

### 3. Run the API (Development Mode)

```bash
dotnet watch --project src/Template.API
```

Once running, access Swagger UI at:
👉 **[http://localhost:5000/swagger](http://localhost:5000/swagger)**
