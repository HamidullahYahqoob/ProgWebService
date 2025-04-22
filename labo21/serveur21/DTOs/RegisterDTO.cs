namespace serveur21.DTOs
{
    public class RegisterDTO
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PasswordConfirm { get; set; } = null!;
    }
}
