namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Analytics page: KPIs, category bars, and monthly trends.
/// </summary>
public partial class AnalyticsViewModel : BaseViewModel
{
    private readonly IApiClient _api;
    private readonly INavigationService _nav;

    public int TotalReviews { get; private set; }
    public string HighRiskRate { get; private set; } = "0%";
    public string MostFlaggedCategory { get; private set; } = "N/A";
    public string AvgClauses { get; private set; } = "0";
    public string TotalTrend { get; private set; } = "No change";
    public List<CategoryBar> CategoryBars { get; private set; } = [];
    public List<MonthTrendRow> MonthTrends { get; private set; } = [];
    public bool HasData { get; private set; }

    public AnalyticsViewModel(IApiClient api, INavigationService nav)
    {
        _api = api;
        _nav = nav;
    }

    [RelayCommand]
    public async Task LoadDataAsync()
    {
        IsLoading = true;
        ErrorMessage = null;
        try
        {
            var reviews = await _api.GetReviewsAsync();
            TotalReviews = reviews.Count;
            HasData = reviews.Count > 0;

            if (reviews.Count == 0)
            {
                HighRiskRate = "0%";
                MostFlaggedCategory = "N/A";
                AvgClauses = "0";
                CategoryBars = [];
                MonthTrends = [];
            }
            else
            {
                var highRiskReviews = reviews.Count(r => r.FlagCounts.High > 0);
                HighRiskRate = $"{Math.Round(highRiskReviews * 100.0 / reviews.Count)}%";
                AvgClauses = reviews.Average(r => r.Findings.Count).ToString("0.0");

                var categories = reviews
                    .SelectMany(r => r.Findings)
                    .GroupBy(f => string.IsNullOrWhiteSpace(f.Category) ? "Uncategorized" : f.Category)
                    .Select(g => new { Name = g.Key, Count = g.Count() })
                    .OrderByDescending(g => g.Count)
                    .ToList();

                MostFlaggedCategory = categories.FirstOrDefault()?.Name ?? "N/A";
                var max = Math.Max(1, categories.FirstOrDefault()?.Count ?? 1);
                CategoryBars = categories.Take(6).Select(c => new CategoryBar
                {
                    Name = c.Name,
                    Count = c.Count,
                    Width = 40 + c.Count / (double)max * 180
                }).ToList();

                MonthTrends = reviews
                    .GroupBy(r => r.CreatedAt.Length >= 7 ? r.CreatedAt[..7] : r.CreatedAt)
                    .OrderByDescending(g => g.Key)
                    .Take(6)
                    .Select(g => new MonthTrendRow
                    {
                        Month = g.Key,
                        Reviews = g.Count(),
                        High = g.Sum(r => r.FlagCounts.High),
                        Medium = g.Sum(r => r.FlagCounts.Medium),
                        Low = g.Sum(r => r.FlagCounts.Low),
                        AvgScore = ((int)g.Average(ReviewScoring.Score)).ToString()
                    })
                    .ToList();
            }

            OnPropertyChanged(nameof(TotalReviews));
            OnPropertyChanged(nameof(HighRiskRate));
            OnPropertyChanged(nameof(MostFlaggedCategory));
            OnPropertyChanged(nameof(AvgClauses));
            OnPropertyChanged(nameof(CategoryBars));
            OnPropertyChanged(nameof(MonthTrends));
            OnPropertyChanged(nameof(HasData));
        }
        catch (Exception)
        {
            ErrorMessage = "Could not load analytics. Check that the API is reachable.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private void StartUpload() => _nav.NavigateTo("Upload");
}
