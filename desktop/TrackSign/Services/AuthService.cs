namespace TrackSign.Services;

using System.IO;
using System.Text.Json;
using Microsoft.Identity.Client;
using TrackSign.Models;

/// <summary>
/// Handles SSO authentication via MSAL (Microsoft Identity).
/// Supports Azure AD, which covers most enterprise clients.
/// For non-Microsoft SSO, swap the provider logic while keeping the same interface.
/// </summary>
public class AuthService : IAuthService
{
    private IPublicClientApplication? _msalClient;
    private AuthConfig _config = new();
    private AuthenticationResult? _authResult;

    public bool IsAuthenticated => _authResult != null;
    public User? CurrentUser { get; private set; }
    public string? AccessToken => _authResult?.AccessToken;

    public AuthService()
    {
        LoadConfig();
        InitializeMsal();
    }

    private void LoadConfig()
    {
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "auth.json");
        if (File.Exists(path))
        {
            var json = File.ReadAllText(path);
            _config = JsonSerializer.Deserialize<AuthConfig>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new AuthConfig();
        }
    }

    private void InitializeMsal()
    {
        if (string.IsNullOrEmpty(_config.ClientId) || _config.ClientId == "YOUR_CLIENT_ID")
        {
            return;
        }

        _msalClient = PublicClientApplicationBuilder
            .Create(_config.ClientId)
            .WithAuthority(_config.Authority)
            .WithRedirectUri(_config.RedirectUri)
            .Build();
    }

    public async Task<bool> LoginAsync()
    {
        if (_msalClient == null)
        {
            return false;
        }

        try
        {
            var accounts = await _msalClient.GetAccountsAsync();
            if (accounts.Any())
            {
                _authResult = await _msalClient.AcquireTokenSilent(_config.Scopes, accounts.FirstOrDefault())
                    .ExecuteAsync();
            }
            else
            {
                _authResult = await _msalClient.AcquireTokenInteractive(_config.Scopes)
                    .WithPrompt(Prompt.SelectAccount)
                    .ExecuteAsync();
            }

            CurrentUser = BuildUser(_authResult);
            return true;
        }
        catch (MsalUiRequiredException)
        {
            try
            {
                _authResult = await _msalClient.AcquireTokenInteractive(_config.Scopes)
                    .WithPrompt(Prompt.SelectAccount)
                    .ExecuteAsync();

                CurrentUser = BuildUser(_authResult);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task LogoutAsync()
    {
        if (_msalClient == null)
        {
            CurrentUser = null;
            _authResult = null;
            return;
        }

        var accounts = await _msalClient.GetAccountsAsync();
        foreach (var account in accounts)
        {
            await _msalClient.RemoveAsync(account);
        }

        _authResult = null;
        CurrentUser = null;
    }

    private static User BuildUser(AuthenticationResult result)
    {
        return new User
        {
            Id = result.UniqueId,
            Email = result.Account?.Username ?? "",
            Name = result.Account?.Username ?? "User",
            Plan = "enterprise"
        };
    }
}
