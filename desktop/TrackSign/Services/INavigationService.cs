namespace TrackSign.Services;

public interface INavigationService
{
    void NavigateTo(string viewName, object? parameter = null);
    void GoBack();
    void Reset();
    event Action<string, object?>? NavigationRequested;
}
