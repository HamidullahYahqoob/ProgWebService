using System.Text.Json.Serialization;

namespace serveur21.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;

        [JsonIgnore]
        public virtual User User { get; set; } = null!;
    }
}
