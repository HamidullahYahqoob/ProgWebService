using Microsoft.AspNetCore.Identity;

namespace serveur21.Models
{
    public class User : IdentityUser
    {
        public virtual List<Review> Reviews { get; set; } = new List<Review>();
    }
}
