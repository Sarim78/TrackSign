namespace TrackSign.Models;

public class Review
{
    public string ReviewId { get; set; } = "";
    public string ContractId { get; set; } = "";
    public string Filename { get; set; } = "";
    public long FileSize { get; set; }
    public string ContractType { get; set; } = "";
    public string ChecklistUsed { get; set; } = "";
    public List<Finding> Findings { get; set; } = [];
    public FlagCounts FlagCounts { get; set; } = new();
    public string CreatedAt { get; set; } = "";
}

public class FlagCounts
{
    public int High { get; set; }
    public int Medium { get; set; }
    public int Low { get; set; }
}
