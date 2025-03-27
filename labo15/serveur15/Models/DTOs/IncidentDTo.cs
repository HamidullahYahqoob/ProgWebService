namespace serveur15.Models.DTOs
{
    public class IncidentDTO
    {
        public string Description { get; set; } = null!;

        public int Nb { get; set; }

        public int[] Ids { get; set; } = [];
    }
}
