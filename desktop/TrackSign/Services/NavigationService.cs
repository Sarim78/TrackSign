namespace TrackSign.Services;

/// <summary>
/// Handles navigation between views in the main window.
/// </summary>
public class NavigationService : INavigationService
{
    public event Action<string, object?>? NavigationRequested;

    private readonly Stack<string> _history = new();

    public void NavigateTo(string viewName, object? parameter = null)
    {
        _history.Push(viewName);
        NavigationRequested?.Invoke(viewName, parameter);
    }

    public void GoBack()
    {
        if (_history.Count > 1)
        {
            _history.Pop();
            var previous = _history.Peek();
            NavigationRequested?.Invoke(previous, null);
        }
    }

    public void Reset()
    {
        _history.Clear();
    }
}
