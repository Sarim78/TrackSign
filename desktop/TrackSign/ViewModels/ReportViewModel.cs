namespace TrackSign.ViewModels;

using System.IO;
using System.Windows.Media;
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
    public int TotalFlags { get; private set; }
    public List<FindingItem> Findings { get; private set; } = [];
    public DoubleCollection RiskDashArray { get; private set; } = [0, 176];
    public string RiskTone { get; private set; } = "low";

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
            TotalFlags = Report.FlagCounts.High + Report.FlagCounts.Medium + Report.FlagCounts.Low;
            RiskTone = RiskScore >= 70 ? "low" : RiskScore >= 40 ? "medium" : "high";

            const double circumference = 232.48;
            var dash = RiskScore / 100.0 * circumference;
            RiskDashArray = [dash, circumference];

            Findings = Report.Findings
                .Select((finding, index) => new FindingItem(finding, index == 0))
                .ToList();

            OnPropertyChanged(nameof(Report));
            OnPropertyChanged(nameof(RiskScore));
            OnPropertyChanged(nameof(TotalFlags));
            OnPropertyChanged(nameof(Findings));
            OnPropertyChanged(nameof(RiskDashArray));
            OnPropertyChanged(nameof(RiskTone));
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

        System.Windows.Clipboard.SetText(BuildReportText());
    }

    [RelayCommand]
    private void PrintReport()
    {
        if (Report == null)
        {
            return;
        }

        var dialog = new System.Windows.Controls.PrintDialog();
        if (dialog.ShowDialog() != true)
        {
            return;
        }

        var doc = new System.Windows.Documents.FlowDocument(new System.Windows.Documents.Paragraph(new System.Windows.Documents.Run(BuildReportText())))
        {
            FontFamily = new System.Windows.Media.FontFamily("Segoe UI"),
            FontSize = 12,
            PageWidth = dialog.PrintableAreaWidth
        };
        dialog.PrintDocument(((System.Windows.Documents.IDocumentPaginatorSource)doc).DocumentPaginator, "TrackSign report");
    }

    [RelayCommand]
    private void ExportPdf()
    {
        DownloadReport();
    }

    [RelayCommand]
    private void DownloadReport()
    {
        if (Report == null)
        {
            return;
        }

        var dialog = new Microsoft.Win32.SaveFileDialog
        {
            Filter = "Text files (*.txt)|*.txt",
            FileName = Path.GetFileNameWithoutExtension(Report.Filename) + "-report.txt",
            Title = "Download report"
        };

        if (dialog.ShowDialog() == true)
        {
            File.WriteAllText(dialog.FileName, BuildReportText());
        }
    }

    private string BuildReportText()
    {
        var text = $"TrackSign Report - {Report!.Filename}\n\n";
        foreach (var f in Report.Findings)
        {
            text += $"[{f.Severity.ToUpperInvariant()}] {f.Category}\n";
            text += $"{f.Clause}\n";
            text += $"Why it matters: {f.Explanation}\n";
            text += $"Fairer version: {f.FairerVersion}\n\n";
        }

        text += "TrackSign does not provide legal advice. This report flags terms worth reviewing with a qualified lawyer.";
        return text;
    }
}
