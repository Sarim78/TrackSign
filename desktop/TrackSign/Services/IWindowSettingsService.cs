namespace TrackSign.Services;

public class WindowBounds
{
    public double Left { get; set; } = 80;
    public double Top { get; set; } = 80;
    public double Width { get; set; } = 1280;
    public double Height { get; set; } = 800;
    public bool Maximized { get; set; }
}

public interface IWindowSettingsService
{
    WindowBounds Load();
    void Save(WindowBounds bounds);
}
