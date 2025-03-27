using System.Text.Json.Serialization;

namespace serveur15.Models
{
    public class Zookeeper
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        [JsonIgnore]
        public virtual List<Dinosaur> Dinosaurs { get; set; } = new List<Dinosaur>();
    }
}
