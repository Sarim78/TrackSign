namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Dashboard overview. Shows stats and recent reviews.
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
    public List<Review> RecentReviews { get; private set; } = [];
    public bool HasRecentReviews => RecentReviews.Count > 0;

    public DashboardViewModel(IApiClient api, IAuthService auth, INavigationService nav)
    {
        _api = api;
        _auth = auth;
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
            HighRiskFlags = reviews.Sum(r => r.FlagCounts.High);

            var thisMonth = DateTime.UtcNow.ToString("yyyy-MM");
            ContractsThisMonth = reviews.Count(r => r.CreatedAt.StartsWith(thisMonth));

            if (reviews.Count == 0)
            {
                AverageRiskDisplay = "N/A";
                HasRiskScore = false;
            }
            else
            {
                var avg = (int)reviews.Average(r =>
                    Math.Clamp(100 - (r.FlagCounts.High * 15 + r.FlagCounts.Medium * 8 + r.FlagCounts.Low * 2), 0, 100));
                AverageRiskDisplay = avg.ToString();
                HasRiskScore = true;
            }

            RecentReviews = reviews.Take(5).ToList();

            OnPropertyChanged(nameof(TotalReviews));
            OnPropertyChanged(nameof(HighRiskFlags));
            OnPropertyChanged(nameof(ContractsThisMonth));
            OnPropertyChanged(nameof(AverageRiskDisplay));
            OnPropertyChanged(nameof(HasRiskScore));
            OnPropertyChanged(nameof(RecentReviews));
            OnPropertyChanged(nameof(HasRecentReviews));
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
    private void OpenReview(string reviewId)
    {
        _nav.NavigateTo("Report", reviewId);
    }

    [RelayCommand]
    private void StartUpload()
    {
        _nav.NavigateTo("Upload");
    }

    [RelayCommand]
    private void ViewHistory()
    {
        _nav.NavigateTo("History");
    }
}
