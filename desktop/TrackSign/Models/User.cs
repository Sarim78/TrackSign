namespace TrackSign.Models;

public class User
{
    public string Id { get; set; } = "";
    public string Email { get; set; } = "";
    public string Name { get; set; } = "";
    public int ReviewCount { get; set; }
    public string Plan { get; set; } = "enterprise";
    public string CreatedAt { get; set; } = "";
}
