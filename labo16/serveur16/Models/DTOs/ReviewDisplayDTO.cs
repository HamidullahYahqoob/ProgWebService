namespace serveur16.Models.DTOs
{
    public class ReviewDisplayDTO
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public string Game { get; set; } = null!;
        public string Author { get; set; }
        public int Upvotes { get; set; }

        public ReviewDisplayDTO(Review review)
        {
            Id = review.Id;
            Text = review.Text;
            Game = review.Game;
            Author = review.Author.UserName;
            Upvotes = review.Upvoters.Count;
        }

    }
}
