namespace serveur15.Models
{
    public class Dinosaur
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Specie { get; set; } = null!;
        public virtual List<Incident> Incidents { get; set; } = new List<Incident>();
        public virtual Zookeeper Zookeeper { get; set; } = null!;
    }
}
