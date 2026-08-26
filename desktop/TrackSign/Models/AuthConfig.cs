namespace TrackSign.Models;

public class AuthConfig
{
    public string Provider { get; set; } = "azure_ad";
    public string Authority { get; set; } = "";
    public string ClientId { get; set; } = "";
    public string RedirectUri { get; set; } = "http://localhost:5000/auth/callback";
    public string[] Scopes { get; set; } = ["openid", "profile", "email"];
    public bool RequireLogin { get; set; } = true;
}
