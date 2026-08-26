namespace TrackSign.Services;

using TrackSign.Models;

public interface IBrandingService
{
    BrandingConfig Config { get; }
    void Load();
}
