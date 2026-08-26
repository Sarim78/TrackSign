namespace TrackSign.Models;

/// <summary>
/// Company branding configuration. Loaded from Config/branding.json.
/// Change this file per client to white-label the app.
/// </summary>
public class BrandingConfig
{
    public string CompanyName { get; set; } = "TrackSign";
    public string AppTitle { get; set; } = "TrackSign Enterprise";
    public string PrimaryColor { get; set; } = "#E8614D";
    public string SecondaryColor { get; set; } = "#1e1c18";
    public string BackgroundColor { get; set; } = "#171412";
    public string TextColor { get; set; } = "#EDEDED";
    public string TextSecondaryColor { get; set; } = "#999999";
    public string BorderColor { get; set; } = "#2a2722";
    public string LogoPath { get; set; } = "Assets/logo.png";
    public string SupportEmail { get; set; } = "support@tracksign.com";
    public string SupportUrl { get; set; } = "https://tracksign.com/support";
}
