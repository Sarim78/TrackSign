namespace TrackSign.ViewModels;

using System.Diagnostics;
using System.IO;
using System.Text.Json;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
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
    public string PlanDisplay
    {
        get
        {
            var plan = Plan;
            return string.IsNullOrWhiteSpace(plan)
                ? "Enterprise"
                : char.ToUpperInvariant(plan[0]) + plan[1..];
        }
    }

    public string CompanyName => _branding.Config.CompanyName;
    public string SupportEmail => _branding.Config.SupportEmail;
    public string SupportUrl => _branding.Config.SupportUrl;
    public string MemberSince =>
        string.IsNullOrWhiteSpace(_auth.CurrentUser?.CreatedAt) ? "Not available" : _auth.CurrentUser!.CreatedAt;
    public int ReviewCount => _auth.CurrentUser?.ReviewCount ?? 0;
    public string ReviewsUsedDisplay => $"{ReviewCount} / Unlimited";
    public string AppVersion => "1.0.0";
    public string ChecklistVersion => "General v1.0";
    public string ApiBaseUrl { get; }

    public bool EmailAfterReview { get; set; } = true;
    public bool WeeklyDigest { get; set; }
    public bool AlertHighRisk { get; set; } = true;

    public SettingsViewModel(IAuthService auth, IBrandingService branding)
    {
        _auth = auth;
        _branding = branding;
        ApiBaseUrl = LoadApiBaseUrl();
    }

    [RelayCommand]
    private void OpenSupportEmail()
    {
        OpenUrl($"mailto:{SupportEmail}");
    }

    [RelayCommand]
    private void OpenDocs()
    {
        OpenUrl(SupportUrl);
    }

    [RelayCommand]
    private void ExportAllData()
    {
        var dialog = new Microsoft.Win32.SaveFileDialog
        {
            Filter = "JSON files (*.json)|*.json",
            FileName = "tracksign-export.json",
            Title = "Export all data"
        };

        if (dialog.ShowDialog() == true)
        {
            var payload = new
            {
                UserName,
                UserEmail,
                Plan,
                ExportedAt = DateTime.UtcNow.ToString("o")
            };
            File.WriteAllText(dialog.FileName, JsonSerializer.Serialize(payload, new JsonSerializerOptions { WriteIndented = true }));
        }
    }

    [RelayCommand]
    private void RequestDeletion()
    {
        OpenUrl($"mailto:{SupportEmail}?subject=Data%20deletion%20request");
    }

    private static void OpenUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return;
        }

        Process.Start(new ProcessStartInfo
        {
            FileName = url,
            UseShellExecute = true
        });
    }

    private static string LoadApiBaseUrl()
    {
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "api.json");
        if (!File.Exists(path))
        {
            return "http://localhost:8000";
        }

        var json = File.ReadAllText(path);
        var config = JsonSerializer.Deserialize<ApiConfig>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return config?.BaseUrl ?? "http://localhost:8000";
    }
}
