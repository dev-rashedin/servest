using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Template.Application.Common.Interfaces;
using Template.Application.Features.SampleItems.Commands.CreateSampleItem;
using Template.Domain.Entities;
using Xunit;

namespace Template.UnitTests.Application;

public class CreateSampleItemCommandHandlerTests
{
    [Fact]
    public async Task Handle_ValidCommand_ShouldCreateSampleItem()
    {
        // Arrange
        var mockSet = new Mock<DbSet<SampleItem>>();
        var mockContext = new Mock<IApplicationDbContext>();
        mockContext.Setup(c => c.SampleItems).Returns(mockSet.Object);
        mockContext.Setup(c => c.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        var handler = new CreateSampleItemCommandHandler(mockContext.Object);
        var command = new CreateSampleItemCommand("Test Title", "Test Description");

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Succeeded.Should().BeTrue();
        result.Data.Should().NotBeNull();
        result.Data!.Title.Should().Be("Test Title");
        mockSet.Verify(m => m.Add(It.IsAny<SampleItem>()), Times.Once);
        mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
