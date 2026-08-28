namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.Input;
using TrackSign.Models;
using TrackSign.Services;

/// <summary>
/// Review history. Lists all past reviews with filtering.
/// </summary>
public partial class HistoryViewModel : BaseViewModel
{
    private const int PageSize = 10;
    private readonly IApiClient _api;
    private readonly INavigationService _nav;

    public List<Review> AllReviews { get; private set; } = [];
    public List<Review> PagedReviews { get; private set; } = [];

    private string _activeFilter = "All";
    public string ActiveFilter
    {
        get => _activeFilter;
        set
        {
            SetProperty(ref _activeFilter, value);
            CurrentPage = 1;
            ApplyFilter();
            OnPropertyChanged(nameof(IsAllFilter));
            OnPropertyChanged(nameof(IsHighFilter));
            OnPropertyChanged(nameof(IsMonthFilter));
        }
    }

    private string _searchQuery = "";
    public string SearchQuery
    {
        get => _searchQuery;
        set
        {
            SetProperty(ref _searchQuery, value);
            CurrentPage = 1;
            ApplyFilter();
        }
    }

    private int _currentPage = 1;
    public int CurrentPage
    {
        get => _currentPage;
        set => SetProperty(ref _currentPage, value);
    }

    public string ShowingText { get; private set; } = "";
    public bool HasReviews => AllReviews.Count > 0;
    public bool HasPagedReviews => PagedReviews.Count > 0;
    public bool CanGoPrevious => CurrentPage > 1;
    public bool CanGoNext => CurrentPage < _totalPages;
    public bool ShowPagination => _filteredCount > PageSize;

    public bool IsAllFilter => ActiveFilter == "All";
    public bool IsHighFilter => ActiveFilter == "High risk";
    public bool IsMonthFilter => ActiveFilter == "This month";

    private int _filteredCount;
    private int _totalPages = 1;

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
            CurrentPage = 1;
            ApplyFilter();
            OnPropertyChanged(nameof(AllReviews));
            OnPropertyChanged(nameof(HasReviews));
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
        IEnumerable<Review> query = _activeFilter switch
        {
            "High risk" => AllReviews.Where(r => r.FlagCounts.High > 0),
            "This month" => AllReviews.Where(r => r.CreatedAt.StartsWith(DateTime.UtcNow.ToString("yyyy-MM"))),
            _ => AllReviews
        };

        if (!string.IsNullOrWhiteSpace(_searchQuery))
        {
            query = query.Where(r =>
                r.Filename.Contains(_searchQuery, StringComparison.OrdinalIgnoreCase) ||
                r.ContractType.Contains(_searchQuery, StringComparison.OrdinalIgnoreCase));
        }

        var filtered = query.ToList();
        _filteredCount = filtered.Count;
        _totalPages = Math.Max(1, (int)Math.Ceiling(_filteredCount / (double)PageSize));
        if (CurrentPage > _totalPages)
        {
            CurrentPage = _totalPages;
        }

        var startIndex = (CurrentPage - 1) * PageSize;
        PagedReviews = filtered.Skip(startIndex).Take(PageSize).ToList();

        if (_filteredCount == 0)
        {
            ShowingText = HasReviews ? "No matching contracts" : "";
        }
        else
        {
            var start = startIndex + 1;
            var end = startIndex + PagedReviews.Count;
            ShowingText = $"Showing {start}-{end} of {_filteredCount}";
        }

        OnPropertyChanged(nameof(PagedReviews));
        OnPropertyChanged(nameof(HasPagedReviews));
        OnPropertyChanged(nameof(ShowingText));
        OnPropertyChanged(nameof(CanGoPrevious));
        OnPropertyChanged(nameof(CanGoNext));
        OnPropertyChanged(nameof(ShowPagination));
    }

    [RelayCommand]
    private void SetFilter(string filter)
    {
        ActiveFilter = filter;
    }

    [RelayCommand]
    private void NextPage()
    {
        if (!CanGoNext)
        {
            return;
        }

        CurrentPage++;
        ApplyFilter();
    }

    [RelayCommand]
    private void PreviousPage()
    {
        if (!CanGoPrevious)
        {
            return;
        }

        CurrentPage--;
        ApplyFilter();
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
