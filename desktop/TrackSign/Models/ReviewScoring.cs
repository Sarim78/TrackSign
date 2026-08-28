namespace TrackSign.Models;

public static class ReviewScoring
{
    public static int Score(Review review)
    {
        var raw = 100 - (review.FlagCounts.High * 15 + review.FlagCounts.Medium * 8 + review.FlagCounts.Low * 2);
        return Math.Clamp(raw, 0, 100);
    }

    public static string Tone(int score) =>
        score >= 70 ? "low" : score >= 40 ? "medium" : "high";

    public static string RelativeDate(string createdAt)
    {
        if (!DateTime.TryParse(createdAt, out var when))
        {
            return string.IsNullOrWhiteSpace(createdAt) ? "Unknown" : createdAt;
        }

        when = DateTime.SpecifyKind(when, DateTimeKind.Utc);
        var elapsed = DateTime.UtcNow - when.ToUniversalTime();
        if (elapsed.TotalMinutes < 1)
        {
            return "Just now";
        }

        if (elapsed.TotalHours < 1)
        {
            return $"{(int)elapsed.TotalMinutes} minutes ago";
        }

        if (elapsed.TotalHours < 24)
        {
            return $"{(int)elapsed.TotalHours} hours ago";
        }

        if (elapsed.TotalDays < 7)
        {
            return $"{(int)elapsed.TotalDays} days ago";
        }

        return when.ToLocalTime().ToString("MMM d, yyyy");
    }
}
