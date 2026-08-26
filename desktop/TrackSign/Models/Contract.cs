namespace TrackSign.Models;

public class Contract
{
    public string Id { get; set; } = "";
    public string Filename { get; set; } = "";
    public long FileSize { get; set; }
    public string ContractType { get; set; } = "auto-detect";
    public string UploadedAt { get; set; } = "";
}
