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
            OnPropertyChanged(nameof(SelectedFileSize));
            OnPropertyChanged(nameof(ShowDropZone));
            OnPropertyChanged(nameof(ShowSelectedState));
            ReviewContractCommand.NotifyCanExecuteChanged();
        }
    }

    public string SelectedFileName => Path.GetFileName(_selectedFilePath ?? "");
    public bool HasSelectedFile => !string.IsNullOrEmpty(_selectedFilePath);
    public long SelectedFileSize =>
        string.IsNullOrEmpty(_selectedFilePath) || !File.Exists(_selectedFilePath)
            ? 0
            : new FileInfo(_selectedFilePath).Length;

    public bool ShowDropZone => !HasSelectedFile;
    public bool ShowSelectedState => HasSelectedFile;

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
            OnPropertyChanged(nameof(ShowDropZone));
            OnPropertyChanged(nameof(ShowSelectedState));
            ReviewContractCommand.NotifyCanExecuteChanged();
        }
    }

    private bool _isDragOver;
    public bool IsDragOver
    {
        get => _isDragOver;
        set => SetProperty(ref _isDragOver, value);
    }

    private int _scanStep;
    public int ScanStep
    {
        get => _scanStep;
        set => SetProperty(ref _scanStep, value);
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

    public List<string> ChecklistItems { get; } =
    [
        "Payment and compensation",
        "Scope and deliverables",
        "Intellectual property",
        "Liability and indemnification",
        "Termination",
        "Non-compete and exclusivity",
        "Confidentiality",
        "And 4 more..."
    ];

    /// <summary>Raised when a review is complete, passes the review ID.</summary>
    public event Action<string>? ReviewCompleted;

    public UploadViewModel(IApiClient api, INavigationService nav)
    {
        _api = api;
        _nav = nav;
    }

    public void AcceptFile(string filePath)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            return;
        }

        if (!string.Equals(Path.GetExtension(filePath), ".pdf", StringComparison.OrdinalIgnoreCase))
        {
            ErrorMessage = "Only PDF files are supported.";
            return;
        }

        ErrorMessage = null;
        SelectedFilePath = filePath;
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
            AcceptFile(dialog.FileName);
        }
    }

    [RelayCommand]
    private void RemoveFile()
    {
        SelectedFilePath = null;
        ErrorMessage = null;
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
            ScanStep = 1;
            ScanningStatus = "Uploading file...";
            await Task.Delay(500);

            ScanStep = 2;
            ScanningStatus = "Extracting text...";
            await Task.Delay(400);

            ScanStep = 3;
            ScanningStatus = "Analyzing clauses...";

            var apiType = MapContractType(_contractType);
            var review = await _api.UploadAndReviewAsync(_selectedFilePath, apiType);

            ScanStep = 4;
            ScanningStatus = "Generating report...";
            await Task.Delay(400);

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
            ScanStep = 0;
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
