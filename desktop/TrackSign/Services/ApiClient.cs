namespace TrackSign.Services;

using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using TrackSign.Models;

/// <summary>
/// HTTP client for the TrackSign FastAPI backend.
/// All requests include the auth token from SSO.
/// </summary>
public class ApiClient : IApiClient
{
    private readonly HttpClient _http;
    private readonly ApiConfig _config;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    public ApiClient(HttpClient http)
    {
        _http = http;

        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "api.json");
        if (File.Exists(path))
        {
            var json = File.ReadAllText(path);
            _config = JsonSerializer.Deserialize<ApiConfig>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new ApiConfig();
        }
        else
        {
            _config = new ApiConfig();
        }

        _http.BaseAddress = new Uri(_config.BaseUrl);
        _http.Timeout = TimeSpan.FromSeconds(_config.Timeout);
    }

    /// <summary>Set the auth token for all subsequent requests.</summary>
    public void SetAuthToken(string token)
    {
        _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    public async Task<User> GetCurrentUserAsync()
    {
        var response = await _http.GetAsync("/api/users/me");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<User>(JsonOptions) ?? new User();
    }

    public async Task<Review> UploadAndReviewAsync(string filePath, string contractType)
    {
        var fileInfo = new FileInfo(filePath);
        if (fileInfo.Length > _config.MaxFileSize)
        {
            throw new InvalidOperationException($"File exceeds maximum size of {_config.MaxFileSize / 1048576}MB");
        }

        var extension = fileInfo.Extension.ToLowerInvariant();
        if (!_config.SupportedFormats.Contains(extension))
        {
            throw new InvalidOperationException($"Unsupported file format: {extension}");
        }

        using var content = new MultipartFormDataContent();
        await using var fileStream = File.OpenRead(filePath);
        using var streamContent = new StreamContent(fileStream);

        content.Add(streamContent, "file", Path.GetFileName(filePath));
        content.Add(new StringContent(contractType), "contract_type");

        var response = await _http.PostAsync("/api/contracts/upload", content);

        if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
        {
            throw new InvalidOperationException("Review limit reached. Contact your administrator.");
        }

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Review>(JsonOptions) ?? new Review();
    }

    public async Task<List<Review>> GetReviewsAsync()
    {
        var response = await _http.GetAsync("/api/contracts/reviews");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<List<Review>>(JsonOptions) ?? [];
    }

    public async Task<Review> GetReviewAsync(string reviewId)
    {
        var response = await _http.GetAsync($"/api/contracts/reviews/{reviewId}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<Review>(JsonOptions) ?? new Review();
    }
}
