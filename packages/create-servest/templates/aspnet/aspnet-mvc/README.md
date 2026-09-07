# Template - ASP.NET Core MVC / Layered Web API

Layered controller-based Web API backend using ASP.NET Core, Entity Framework Core, and Swagger UI.

## 📁 Project Structure

- `Controllers/`: REST API Controllers inheriting from `BaseApiController`.
- `Services/`: Business logic services & interfaces.
- `Models/`: Database domain entities.
- `DTOs/`: Request/Response Data Transfer Objects.
- `Data/`: `ApplicationDbContext` with EF Core Sqlite.
- `Middleware/`: Global Exception Handling middleware.

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 or .NET 9.0 SDK](https://dotnet.microsoft.com/download)

### 1. Restore & Build

```bash
dotnet restore
dotnet build
```

### 2. Run with Hot-Reload

```bash
dotnet watch
```

Once running, access Swagger UI at:
👉 **[http://localhost:5000/swagger](http://localhost:5000/swagger)**
