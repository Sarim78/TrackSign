namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Displays a single contract review report with all findings.
/// </summary>
public partial class ReportViewModel : BaseViewModel
{
    private readonly IApiClient _api;
    private readonly INavigationService _nav;

    public Review? Report { get; private set; }
    public int RiskScore { get; private set; }

    public ReportViewModel(IApiClient api, INavigationService nav)
    {
        _api = api;
        _nav = nav;
    }

    [RelayCommand]
    public async Task LoadReportAsync(string reviewId)
    {
        IsLoading = true;
        ErrorMessage = null;
        try
        {
            Report = await _api.GetReviewAsync(reviewId);

            var score = 100 - (Report.FlagCounts.High * 15 + Report.FlagCounts.Medium * 8 + Report.FlagCounts.Low * 2);
            RiskScore = Math.Clamp(score, 0, 100);

            OnPropertyChanged(nameof(Report));
            OnPropertyChanged(nameof(RiskScore));
        }
        catch (Exception)
        {
            ErrorMessage = "Could not load this report. Try again from History.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private void GoBack()
    {
        _nav.GoBack();
    }

    [RelayCommand]
    private void CopyReport()
    {
        if (Report == null)
        {
            return;
        }

        var text = $"TrackSign Report - {Report.Filename}\n\n";
        foreach (var f in Report.Findings)
        {
            text += $"[{f.Severity.ToUpperInvariant()}] {f.Category}\n";
            text += $"{f.Clause}\n";
            text += $"Why it matters: {f.Explanation}\n";
            text += $"Fairer version: {f.FairerVersion}\n\n";
        }
        text += "This report does not constitute legal advice.";

        System.Windows.Clipboard.SetText(text);
    }
}
