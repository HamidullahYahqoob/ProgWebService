using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace serveur16.Models
{
    public class User : IdentityUser   
    {
        [InverseProperty("Author")]
        public virtual List<Review> Reviews { get; set; } = new List<Review>();

        [InverseProperty("Upvoters")]
        public virtual List<Review> UpvotedReviews { get; set; } = new List<Review>();
    }
}
