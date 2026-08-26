namespace TrackSign.ViewModels;

using System.IO;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Services;

/// <summary>
/// Main window logic. Controls sidebar navigation and active view.
/// </summary>
public partial class MainViewModel : BaseViewModel
{
    private readonly IAuthService _auth;
    private readonly INavigationService _nav;
    private readonly IBrandingService _branding;
    private readonly ReportViewModel _report;

    private string _activeView = "Dashboard";
    public string ActiveView
    {
        get => _activeView;
        set => SetProperty(ref _activeView, value);
    }

    public string UserName => _auth.CurrentUser?.Name ?? "User";
    public string UserEmail => _auth.CurrentUser?.Email ?? "";
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

    public DashboardViewModel Dashboard { get; }
    public UploadViewModel Upload { get; }
    public ReportViewModel Report => _report;
    public HistoryViewModel History { get; }
    public SettingsViewModel Settings { get; }

    public object CurrentContent { get; private set; }

    public event Action? LogoutRequested;

    public MainViewModel(
        IAuthService auth,
        INavigationService nav,
        IBrandingService branding,
        DashboardViewModel dashboard,
        UploadViewModel upload,
        ReportViewModel report,
        HistoryViewModel history,
        SettingsViewModel settings)
    {
        _auth = auth;
        _nav = nav;
        _branding = branding;
        Dashboard = dashboard;
        Upload = upload;
        _report = report;
        History = history;
        Settings = settings;
        CurrentContent = Dashboard;

        _nav.Reset();
        _nav.NavigationRequested += OnNavigationRequested;
        _nav.NavigateTo("Dashboard");
    }

    [RelayCommand]
    private void NavigateTo(string view)
    {
        _nav.NavigateTo(view);
    }

    [RelayCommand]
    private async Task LogoutAsync()
    {
        _nav.NavigationRequested -= OnNavigationRequested;
        _nav.Reset();
        await _auth.LogoutAsync();
        LogoutRequested?.Invoke();
    }

    private async void OnNavigationRequested(string viewName, object? parameter)
    {
        ActiveView = viewName;
        CurrentContent = viewName switch
        {
            "Upload" => Upload,
            "Report" => Report,
            "History" => History,
            "Settings" => Settings,
            _ => Dashboard
        };
        OnPropertyChanged(nameof(CurrentContent));

        if (viewName == "Dashboard")
        {
            await Dashboard.LoadDataAsync();
        }
        else if (viewName == "History")
        {
            await History.LoadHistoryAsync();
        }
        else if (viewName == "Report" && parameter is string reviewId && !string.IsNullOrWhiteSpace(reviewId))
        {
            await Report.LoadReportAsync(reviewId);
        }
    }
}
