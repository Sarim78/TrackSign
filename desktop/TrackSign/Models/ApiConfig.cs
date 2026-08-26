namespace TrackSign.Models;

public class ApiConfig
{
    public string BaseUrl { get; set; } = "http://localhost:8000";
    public int Timeout { get; set; } = 30;
    public long MaxFileSize { get; set; } = 20971520;
    public string[] SupportedFormats { get; set; } = [".pdf"];
}
