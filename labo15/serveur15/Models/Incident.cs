using System.Text.Json.Serialization;

namespace serveur15.Models
{
    public class Incident
    {
        public int Id { get; set; }
        public int NbCasualties { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = null!;

        [JsonIgnore]
        public virtual List<Dinosaur> InvolvedDinosaurs { get; set; } = new List<Dinosaur>();
    }
}
