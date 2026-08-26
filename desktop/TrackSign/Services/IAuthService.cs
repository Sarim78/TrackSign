namespace TrackSign.Services;

using TrackSign.Models;

public interface IAuthService
{
    bool IsAuthenticated { get; }
    bool DevMode { get; }
    User? CurrentUser { get; }
    string? AccessToken { get; }
    Task<bool> LoginAsync();
    Task LogoutAsync();
}
