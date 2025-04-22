using serveur21.Models;

namespace serveur21.DTOs
{
    public class ReviewDisplayDTO
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public string Author { get; set; } = null!;

        public ReviewDisplayDTO(Review r)
        {
            Id = r.Id;
            Text = r.Text;
            Author = r.User.UserName!;
        }
    }
}
