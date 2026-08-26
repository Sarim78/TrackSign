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
    public List<Review> RecentReviews { get; private set; } = [];

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

            RecentReviews = reviews.Take(5).ToList();

            OnPropertyChanged(nameof(TotalReviews));
            OnPropertyChanged(nameof(HighRiskFlags));
            OnPropertyChanged(nameof(ContractsThisMonth));
            OnPropertyChanged(nameof(RecentReviews));
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
}
