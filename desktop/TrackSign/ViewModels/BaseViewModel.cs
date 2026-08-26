namespace TrackSign.ViewModels;

using CommunityToolkit.Mvvm.ComponentModel;

/// <summary>
/// Base class for all view models. Provides property change notification.
/// </summary>
public abstract class BaseViewModel : ObservableObject
{
    private bool _isLoading;
    public bool IsLoading
    {
        get => _isLoading;
        set => SetProperty(ref _isLoading, value);
    }

    private string? _errorMessage;
    public string? ErrorMessage
    {
        get => _errorMessage;
        set => SetProperty(ref _errorMessage, value);
    }
}
