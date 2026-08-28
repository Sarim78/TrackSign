namespace TrackSign.Services;

using System.IO;
using System.Text.Json;

public class WindowSettingsService : IWindowSettingsService
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    private static string FilePath =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "TrackSign", "window.json");

    public WindowBounds Load()
    {
        try
        {
            if (File.Exists(FilePath))
            {
                var json = File.ReadAllText(FilePath);
                return JsonSerializer.Deserialize<WindowBounds>(json) ?? new WindowBounds();
            }
        }
        catch
        {
            // Use defaults if the settings file is missing or unreadable.
        }

        return new WindowBounds();
    }

    public void Save(WindowBounds bounds)
    {
        try
        {
            var dir = Path.GetDirectoryName(FilePath);
            if (!string.IsNullOrEmpty(dir))
            {
                Directory.CreateDirectory(dir);
            }

            File.WriteAllText(FilePath, JsonSerializer.Serialize(bounds, JsonOptions));
        }
        catch
        {
            // Ignore persistence errors so closing the window never fails.
        }
    }
}
