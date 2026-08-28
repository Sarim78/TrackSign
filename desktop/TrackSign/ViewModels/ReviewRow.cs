namespace TrackSign.ViewModels;

using TrackSign.Models;

public class ReviewRow
{
    public Review Review { get; }
    public string ReviewId => Review.ReviewId;
    public string Filename => Review.Filename;
    public string ContractType => string.IsNullOrWhiteSpace(Review.ContractType) ? "Auto-detect" : Review.ContractType;
    public FlagCounts FlagCounts => Review.FlagCounts;
    public int RiskScore { get; }
    public string RiskTone { get; }
    public string RelativeDate { get; }

    public ReviewRow(Review review)
    {
        Review = review;
        RiskScore = ReviewScoring.Score(review);
        RiskTone = ReviewScoring.Tone(RiskScore);
        RelativeDate = ReviewScoring.RelativeDate(review.CreatedAt);
    }
}

public class DayBar
{
    public string Label { get; set; } = "";
    public int Count { get; set; }
    public double Height { get; set; }
}

public class CategoryBar
{
    public string Name { get; set; } = "";
    public int Count { get; set; }
    public double Width { get; set; }
}

public class MonthTrendRow
{
    public string Month { get; set; } = "";
    public int Reviews { get; set; }
    public int High { get; set; }
    public int Medium { get; set; }
    public int Low { get; set; }
    public string AvgScore { get; set; } = "N/A";
}
