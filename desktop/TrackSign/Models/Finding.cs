namespace TrackSign.Models;

/// <summary>
/// A single flagged clause from a contract review.
/// </summary>
public class Finding
{
    public string Severity { get; set; } = "medium";
    public string Category { get; set; } = "";
    public string Clause { get; set; } = "";
    public string Explanation { get; set; } = "";
    public string FairerVersion { get; set; } = "";
}
