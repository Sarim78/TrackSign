namespace TrackSign.Services;

using System.IO;
using System.Text.Json;
using TrackSign.Models;

/// <summary>
/// Loads branding configuration from Config/branding.json.
/// Allows white-labeling the app per corporate client.
/// </summary>
public class BrandingService : IBrandingService
{
    public BrandingConfig Config { get; private set; } = new();

    public void Load()
    {
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "branding.json");
        if (File.Exists(path))
        {
            var json = File.ReadAllText(path);
            Config = JsonSerializer.Deserialize<BrandingConfig>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new BrandingConfig();
        }
    }
}
