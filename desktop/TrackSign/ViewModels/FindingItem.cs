namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;

/// <summary>
/// Display wrapper for a finding so the report can expand and collapse each card.
/// </summary>
public partial class FindingItem : ObservableObject
{
    public Finding Finding { get; }

    public string Severity => Finding.Severity;
    public string SeverityLabel => Finding.Severity.ToUpperInvariant();
    public string Category => Finding.Category;
    public string Clause => Finding.Clause;
    public string Explanation => Finding.Explanation;
    public string FairerVersion => Finding.FairerVersion;

    [ObservableProperty]
    private bool isExpanded;

    public FindingItem(Finding finding, bool expanded)
    {
        Finding = finding;
        IsExpanded = expanded;
    }

    [RelayCommand]
    private void Toggle()
    {
        IsExpanded = !IsExpanded;
    }
}
