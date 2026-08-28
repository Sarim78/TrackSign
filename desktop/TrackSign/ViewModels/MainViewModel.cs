namespace TrackSign.ViewModels;

using System.IO;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Main window logic. Controls sidebar navigation, ribbon, and active view.
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
        set
        {
            SetProperty(ref _activeView, value);
            OnPropertyChanged(nameof(ActivePageName));
            OnPropertyChanged(nameof(IsDashboardActive));
            OnPropertyChanged(nameof(IsUploadActive));
            OnPropertyChanged(nameof(IsHistoryActive));
            OnPropertyChanged(nameof(IsAnalyticsActive));
            OnPropertyChanged(nameof(IsSettingsActive));
            OnPropertyChanged(nameof(IsReportActive));
        }
    }

    public string ActivePageName => ActiveView switch
    {
        "Upload" => "Upload contract",
        "Report" => "Report",
        "History" => "Review history",
        "Analytics" => "Analytics",
        "Settings" => "Settings",
        _ => "Dashboard"
    };

    public bool IsDashboardActive => ActiveView is "Dashboard";
    public bool IsUploadActive => ActiveView is "Upload";
    public bool IsHistoryActive => ActiveView is "History";
    public bool IsAnalyticsActive => ActiveView is "Analytics";
    public bool IsSettingsActive => ActiveView is "Settings";
    public bool IsReportActive => ActiveView is "Report";

    public string UserName => _auth.CurrentUser?.Name ?? "User";
    public string UserEmail => _auth.CurrentUser?.Email ?? "";
    public string CompanyName => _branding.Config.CompanyName;
    public string AppTitle => _branding.Config.AppTitle;
    public string PlanDisplay
    {
        get
        {
            var plan = _auth.CurrentUser?.Plan ?? "enterprise";
            return string.IsNullOrWhiteSpace(plan)
                ? "Enterprise"
                : char.ToUpperInvariant(plan[0]) + plan[1..];
        }
    }

    public string UserInitials
    {
        get
        {
            var name = UserName.Trim();
            var parts = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length >= 2)
            {
                return $"{char.ToUpperInvariant(parts[0][0])}{char.ToUpperInvariant(parts[1][0])}";
            }

            return name.Length >= 2 ? name[..2].ToUpperInvariant() : name.ToUpperInvariant();
        }
    }

    public bool HasLogo => File.Exists(LogoPath);

    private int _reviewCount;
    public int ReviewCount
    {
        get => _reviewCount;
        private set
        {
            SetProperty(ref _reviewCount, value);
            OnPropertyChanged(nameof(ReviewCountLabel));
        }
    }

    public string ReviewCountLabel => $"{ReviewCount} reviews";

    public string LogoPath
    {
        get
        {
            var relative = _branding.Config.LogoPath;
            var full = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, relative);
            return File.Exists(full) ? full : relative;
        }
    }

    private bool _isSidebarCollapsed;
    public bool IsSidebarCollapsed
    {
        get => _isSidebarCollapsed;
        set
        {
            SetProperty(ref _isSidebarCollapsed, value);
            OnPropertyChanged(nameof(CollapseGlyph));
        }
    }

    public string CollapseGlyph => IsSidebarCollapsed ? "\uE76C" : "\uE76B";

    public List<ReviewRow> RecentSidebarReviews { get; private set; } = [];
    public bool HasRecentSidebar => RecentSidebarReviews.Count > 0;

    public string ConnectionLabel => "Connected to TrackSign API";
    public string ChecklistVersion => "General v1.0";

    public DashboardViewModel Dashboard { get; }
    public UploadViewModel Upload { get; }
    public ReportViewModel Report => _report;
    public HistoryViewModel History { get; }
    public AnalyticsViewModel Analytics { get; }
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
        AnalyticsViewModel analytics,
        SettingsViewModel settings)
    {
        _auth = auth;
        _nav = nav;
        _branding = branding;
        Dashboard = dashboard;
        Upload = upload;
        _report = report;
        History = history;
        Analytics = analytics;
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
    private void ToggleSidebar()
    {
        IsSidebarCollapsed = !IsSidebarCollapsed;
    }

    [RelayCommand]
    private void OpenPdf()
    {
        _nav.NavigateTo("Upload");
        Upload.BrowseFileCommand.Execute(null);
    }

    [RelayCommand]
    private async Task RefreshAsync()
    {
        await OnNavigationRequestedAsync(ActiveView, null);
    }

    [RelayCommand]
    private void GoBackIfReport()
    {
        if (IsReportActive)
        {
            _nav.GoBack();
        }
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
        await OnNavigationRequestedAsync(viewName, parameter);
    }

    private async Task OnNavigationRequestedAsync(string viewName, object? parameter)
    {
        ActiveView = viewName;
        CurrentContent = viewName switch
        {
            "Upload" => Upload,
            "Report" => Report,
            "History" => History,
            "Analytics" => Analytics,
            "Settings" => Settings,
            _ => Dashboard
        };
        OnPropertyChanged(nameof(CurrentContent));

        if (viewName == "Dashboard")
        {
            await Dashboard.LoadDataAsync();
            ReviewCount = Dashboard.TotalReviews;
            RecentSidebarReviews = Dashboard.RecentRows.Take(3).ToList();
            OnPropertyChanged(nameof(RecentSidebarReviews));
            OnPropertyChanged(nameof(HasRecentSidebar));
        }
        else if (viewName == "History")
        {
            await History.LoadHistoryAsync();
            ReviewCount = History.AllReviews.Count;
        }
        else if (viewName == "Analytics")
        {
            await Analytics.LoadDataAsync();
            ReviewCount = Analytics.TotalReviews;
        }
        else if (viewName == "Report" && parameter is string reviewId && !string.IsNullOrWhiteSpace(reviewId))
        {
            await Report.LoadReportAsync(reviewId);
        }
    }
}
