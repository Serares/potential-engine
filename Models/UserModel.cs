namespace PotentialEngine.Models;

public class UserModel
{
    public string Username { get; set; } = null!;
    public string ConnectionId { get; set; } = null!;
    public bool IsAvailable { get; set; } = true;
}