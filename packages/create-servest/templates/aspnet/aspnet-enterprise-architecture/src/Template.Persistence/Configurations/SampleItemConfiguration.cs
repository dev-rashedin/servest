using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Template.Domain.Entities;

namespace Template.Persistence.Configurations;

public class SampleItemConfiguration : IEntityTypeConfiguration<SampleItem>
{
    public void Configure(EntityTypeBuilder<SampleItem> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);
    }
}
