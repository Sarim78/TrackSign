namespace TrackSign.Services;

using TrackSign.Models;

public interface IApiClient
{
    void SetAuthToken(string token);
    Task<User> GetCurrentUserAsync();
    Task<Review> UploadAndReviewAsync(string filePath, string contractType);
    Task<List<Review>> GetReviewsAsync();
    Task<Review> GetReviewAsync(string reviewId);
}
