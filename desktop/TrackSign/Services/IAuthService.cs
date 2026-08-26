namespace TrackSign.Services;

using TrackSign.Models;

public interface IAuthService
{
    bool IsAuthenticated { get; }
    User? CurrentUser { get; }
    string? AccessToken { get; }
    Task<bool> LoginAsync();
    Task LogoutAsync();
}
