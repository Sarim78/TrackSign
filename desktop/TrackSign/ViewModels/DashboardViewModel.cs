namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Dashboard overview with KPI cards, activity chart, and recent table.
/// </summary>
public partial class DashboardViewModel : BaseViewModel
{
    private readonly IApiClient _api;
    private readonly IAuthService _auth;
    private readonly INavigationService _nav;

    public string UserName => _auth.CurrentUser?.Name ?? "User";
    public int TotalReviews { get; private set; }
    public int HighRiskFlags { get; private set; }
    public int ContractsThisMonth { get; private set; }
    public string AverageRiskDisplay { get; private set; } = "N/A";
    public bool HasRiskScore { get; private set; }
    public List<ReviewRow> RecentRows { get; private set; } = [];
    public bool HasRecentReviews => RecentRows.Count > 0;
    public List<DayBar> WeekBars { get; private set; } = [];
    public bool HasActivity => WeekBars.Any(b => b.Count > 0);
    public int DistHigh { get; private set; }
    public int DistMedium { get; private set; }
    public int DistLow { get; private set; }
    public bool HasDistribution => DistHigh + DistMedium + DistLow > 0;
    public List<string> ActivityRanges { get; } = ["Last 7 days", "Last 30 days"];
    public string ActivityRange { get; set; } = "Last 7 days";
    public string MonthComparison { get; private set; } = "vs last month: N/A";

    public DashboardViewModel(IApiClient api, IAuthService auth, INavigationService nav)
    {
        _api = api;
        _auth = auth;
        _nav = nav;
        WeekBars = BuildEmptyWeek();
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
            HighRiskFlags = reviews.Sum(r => r.FlagCounts.High);
            DistHigh = reviews.Sum(r => r.FlagCounts.High);
            DistMedium = reviews.Sum(r => r.FlagCounts.Medium);
            DistLow = reviews.Sum(r => r.FlagCounts.Low);

            var thisMonth = DateTime.UtcNow.ToString("yyyy-MM");
            ContractsThisMonth = reviews.Count(r => r.CreatedAt.StartsWith(thisMonth));

            if (reviews.Count == 0)
            {
                AverageRiskDisplay = "N/A";
                HasRiskScore = false;
            }
            else
            {
                var avg = (int)reviews.Average(r => ReviewScoring.Score(r));
                AverageRiskDisplay = avg.ToString();
                HasRiskScore = true;
            }

            RecentRows = reviews.Take(5).Select(r => new ReviewRow(r)).ToList();
            WeekBars = BuildWeek(reviews);

            OnPropertyChanged(nameof(TotalReviews));
            OnPropertyChanged(nameof(HighRiskFlags));
            OnPropertyChanged(nameof(ContractsThisMonth));
            OnPropertyChanged(nameof(AverageRiskDisplay));
            OnPropertyChanged(nameof(HasRiskScore));
            OnPropertyChanged(nameof(RecentRows));
            OnPropertyChanged(nameof(HasRecentReviews));
            OnPropertyChanged(nameof(WeekBars));
            OnPropertyChanged(nameof(HasActivity));
            OnPropertyChanged(nameof(DistHigh));
            OnPropertyChanged(nameof(DistMedium));
            OnPropertyChanged(nameof(DistLow));
            OnPropertyChanged(nameof(HasDistribution));
        }
        catch (Exception)
        {
            ErrorMessage = "Could not load dashboard data. Check that the API is reachable.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private void OpenReview(string reviewId) => _nav.NavigateTo("Report", reviewId);

    [RelayCommand]
    private void StartUpload() => _nav.NavigateTo("Upload");

    [RelayCommand]
    private void ViewHistory() => _nav.NavigateTo("History");

    private static List<DayBar> BuildEmptyWeek()
    {
        var labels = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };
        return labels.Select(l => new DayBar { Label = l, Count = 0, Height = 8 }).ToList();
    }

    private static List<DayBar> BuildWeek(List<Review> reviews)
    {
        var bars = BuildEmptyWeek();
        var start = DateTime.UtcNow.Date.AddDays(-(int)DateTime.UtcNow.DayOfWeek + (int)DayOfWeek.Monday);
        if (DateTime.UtcNow.DayOfWeek == DayOfWeek.Sunday)
        {
            start = start.AddDays(-7);
        }

        var counts = new int[7];
        foreach (var review in reviews)
        {
            if (!DateTime.TryParse(review.CreatedAt, out var when))
            {
                continue;
            }

            var day = when.ToUniversalTime().Date;
            var offset = (int)(day - start).TotalDays;
            if (offset is >= 0 and < 7)
            {
                counts[offset]++;
            }
        }

        var max = Math.Max(1, counts.Max());
        for (var i = 0; i < 7; i++)
        {
            bars[i].Count = counts[i];
            bars[i].Height = counts[i] == 0 ? 8 : 8 + counts[i] / (double)max * 112;
        }

        return bars;
    }
}
