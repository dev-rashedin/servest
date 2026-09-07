using FluentValidation;

namespace Template.Application.Features.SampleItems.Commands.CreateSampleItem;

public class CreateSampleItemCommandValidator : AbstractValidator<CreateSampleItemCommand>
{
    public CreateSampleItemCommandValidator()
    {
        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");
    }
}
