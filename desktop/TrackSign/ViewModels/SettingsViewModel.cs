namespace TrackSign.ViewModels;

using TrackSign.Services;

/// <summary>
/// Settings and account management.
/// </summary>
public partial class SettingsViewModel : BaseViewModel
{
    private readonly IAuthService _auth;
    private readonly IBrandingService _branding;

    public string UserName => _auth.CurrentUser?.Name ?? "";
    public string UserEmail => _auth.CurrentUser?.Email ?? "";
    public string Plan => _auth.CurrentUser?.Plan ?? "enterprise";
    public string CompanyName => _branding.Config.CompanyName;
    public string SupportEmail => _branding.Config.SupportEmail;

    public SettingsViewModel(IAuthService auth, IBrandingService branding)
    {
        _auth = auth;
        _branding = branding;
    }
}
