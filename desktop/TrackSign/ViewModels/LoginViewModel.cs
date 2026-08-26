namespace TrackSign.ViewModels;

using System.IO;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Services;

/// <summary>
/// Login screen logic. Handles SSO authentication.
/// </summary>
public partial class LoginViewModel : BaseViewModel
{
    private readonly IAuthService _auth;
    private readonly IBrandingService _branding;

    public string CompanyName => _branding.Config.CompanyName;
    public string AppTitle => _branding.Config.AppTitle;
    public string LogoPath
    {
        get
        {
            var relative = _branding.Config.LogoPath;
            var full = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, relative);
            return File.Exists(full) ? full : relative;
        }
    }

    public LoginViewModel(IAuthService auth, IBrandingService branding)
    {
        _auth = auth;
        _branding = branding;
    }

    /// <summary>Triggered when login succeeds, main window should open.</summary>
    public event Action? LoginSucceeded;

    [RelayCommand]
    private async Task LoginAsync()
    {
        IsLoading = true;
        ErrorMessage = null;

        try
        {
            var success = await _auth.LoginAsync();
            if (success)
            {
                LoginSucceeded?.Invoke();
            }
            else
            {
                ErrorMessage = "Login failed. Check your SSO settings and try again.";
            }
        }
        catch (Exception)
        {
            ErrorMessage = "Authentication could not be completed. Please try again.";
        }
        finally
        {
            IsLoading = false;
        }
    }
}
