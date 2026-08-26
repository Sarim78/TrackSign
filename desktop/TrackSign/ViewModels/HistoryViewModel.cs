namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Review history. Lists all past reviews with filtering.
/// </summary>
public partial class HistoryViewModel : BaseViewModel
{
    private readonly IApiClient _api;
    private readonly INavigationService _nav;

    public List<Review> AllReviews { get; private set; } = [];
    public List<Review> FilteredReviews { get; private set; } = [];

    private string _activeFilter = "All";
    public string ActiveFilter
    {
        get => _activeFilter;
        set
        {
            SetProperty(ref _activeFilter, value);
            ApplyFilter();
        }
    }

    public HistoryViewModel(IApiClient api, INavigationService nav)
    {
        _api = api;
        _nav = nav;
    }

    [RelayCommand]
    public async Task LoadHistoryAsync()
    {
        IsLoading = true;
        ErrorMessage = null;
        try
        {
            AllReviews = await _api.GetReviewsAsync();
            ApplyFilter();
            OnPropertyChanged(nameof(AllReviews));
        }
        catch (Exception)
        {
            ErrorMessage = "Could not load review history. Check that the API is reachable.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void ApplyFilter()
    {
        FilteredReviews = _activeFilter switch
        {
            "High risk" => AllReviews.Where(r => r.FlagCounts.High > 0).ToList(),
            "This month" => AllReviews.Where(r => r.CreatedAt.StartsWith(DateTime.UtcNow.ToString("yyyy-MM"))).ToList(),
            _ => AllReviews
        };
        OnPropertyChanged(nameof(FilteredReviews));
    }

    [RelayCommand]
    private void SetFilter(string filter)
    {
        ActiveFilter = filter;
    }

    [RelayCommand]
    private void OpenReview(string reviewId)
    {
        _nav.NavigateTo("Report", reviewId);
    }
}
