using System.Text.Json.Serialization;

namespace Template.Application.Common.Models;

public class Result<T>
{
    public bool Succeeded { get; }
    public T? Data { get; }
    public string? Error { get; }

    [JsonConstructor]
    public Result(bool succeeded, T? data, string? error)
    {
        Succeeded = succeeded;
        Data = data;
        Error = error;
    }

    public static Result<T> Success(T data) => new(true, data, null);
    public static Result<T> Failure(string error) => new(false, default, error);
}

public class Result
{
    public bool Succeeded { get; }
    public string? Error { get; }

    [JsonConstructor]
    public Result(bool succeeded, string? error)
    {
        Succeeded = succeeded;
        Error = error;
    }

    public static Result Success() => new(true, null);
    public static Result Failure(string error) => new(false, error);
}
