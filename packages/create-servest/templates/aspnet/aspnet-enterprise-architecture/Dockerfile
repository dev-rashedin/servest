# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["src/Template.API/Template.API.csproj", "src/Template.API/"]
COPY ["src/Template.Application/Template.Application.csproj", "src/Template.Application/"]
COPY ["src/Template.Domain/Template.Domain.csproj", "src/Template.Domain/"]
COPY ["src/Template.Infrastructure/Template.Infrastructure.csproj", "src/Template.Infrastructure/"]
COPY ["src/Template.Persistence/Template.Persistence.csproj", "src/Template.Persistence/"]

RUN dotnet restore "src/Template.API/Template.API.csproj"

# Copy source and publish
COPY . .
WORKDIR "/src/src/Template.API"
RUN dotnet publish "Template.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "Template.API.dll"]
