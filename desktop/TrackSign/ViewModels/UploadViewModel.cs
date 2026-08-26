namespace TrackSign.ViewModels;

using System.IO;
using CommunityToolkit.Mvvm.Input;
using TrackSign.Services;

/// <summary>
/// Contract upload and review. Handles file selection, validation, and API submission.
/// </summary>
public partial class UploadViewModel : BaseViewModel
{
    private readonly IApiClient _api;
    private readonly INavigationService _nav;

    private string? _selectedFilePath;
    public string? SelectedFilePath
    {
        get => _selectedFilePath;
        set
        {
            SetProperty(ref _selectedFilePath, value);
            OnPropertyChanged(nameof(SelectedFileName));
            OnPropertyChanged(nameof(HasSelectedFile));
            ReviewContractCommand.NotifyCanExecuteChanged();
        }
    }

    public string SelectedFileName => Path.GetFileName(_selectedFilePath ?? "");
    public bool HasSelectedFile => !string.IsNullOrEmpty(_selectedFilePath);

    private string _contractType = "Auto-detect (recommended)";
    public string ContractType
    {
        get => _contractType;
        set => SetProperty(ref _contractType, value);
    }

    private string _scanningStatus = "";
    public string ScanningStatus
    {
        get => _scanningStatus;
        set => SetProperty(ref _scanningStatus, value);
    }

    private bool _isScanning;
    public bool IsScanning
    {
        get => _isScanning;
        set
        {
            SetProperty(ref _isScanning, value);
            ReviewContractCommand.NotifyCanExecuteChanged();
        }
    }

    /// <summary>Available contract types for the dropdown.</summary>
    public List<string> ContractTypes { get; } =
    [
        "Auto-detect (recommended)",
        "Service agreement",
        "Vendor / supplier contract",
        "Non-disclosure agreement (NDA)",
        "Lease / rental agreement",
        "Employment contract",
        "Statement of work (SOW)",
        "Partnership agreement",
        "Licensing agreement",
        "Other"
    ];

    /// <summary>Raised when a review is complete, passes the review ID.</summary>
    public event Action<string>? ReviewCompleted;

    public UploadViewModel(IApiClient api, INavigationService nav)
    {
        _api = api;
        _nav = nav;
    }

    [RelayCommand]
    private void BrowseFile()
    {
        var dialog = new Microsoft.Win32.OpenFileDialog
        {
            Filter = "PDF files (*.pdf)|*.pdf",
            Title = "Select a contract to review"
        };

        if (dialog.ShowDialog() == true)
        {
            SelectedFilePath = dialog.FileName;
        }
    }

    private bool CanReviewContract() => HasSelectedFile && !IsScanning;

    [RelayCommand(CanExecute = nameof(CanReviewContract))]
    private async Task ReviewContractAsync()
    {
        if (string.IsNullOrEmpty(_selectedFilePath))
        {
            return;
        }

        IsScanning = true;
        ErrorMessage = null;

        try
        {
            ScanningStatus = "Uploading file...";
            await Task.Delay(500);

            ScanningStatus = "Extracting text...";
            await Task.Delay(300);

            ScanningStatus = "Analyzing clauses...";

            var apiType = MapContractType(_contractType);
            var review = await _api.UploadAndReviewAsync(_selectedFilePath, apiType);

            ScanningStatus = "Review complete.";
            await Task.Delay(500);

            ReviewCompleted?.Invoke(review.ReviewId);
            _nav.NavigateTo("Report", review.ReviewId);
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("limit", StringComparison.OrdinalIgnoreCase))
        {
            ErrorMessage = "Review limit reached. Contact your administrator.";
        }
        catch (InvalidOperationException ex)
        {
            ErrorMessage = ex.Message;
        }
        catch (Exception)
        {
            ErrorMessage = "Review failed. Check the file and try again.";
        }
        finally
        {
            IsScanning = false;
            ScanningStatus = "";
        }
    }

    private static string MapContractType(string display)
    {
        return display switch
        {
            "Service agreement" => "service_agreement",
            "Vendor / supplier contract" => "vendor",
            "Non-disclosure agreement (NDA)" => "nda",
            "Lease / rental agreement" => "lease",
            "Employment contract" => "employment",
            "Statement of work (SOW)" => "service_agreement",
            "Partnership agreement" => "partnership",
            "Licensing agreement" => "licensing",
            "Other" => "general",
            _ => "auto-detect"
        };
    }
}
