using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using serveur16.Models;

namespace serveur16.Data
{
    public class serveur16Context : IdentityDbContext<User>
    {
        public serveur16Context (DbContextOptions<serveur16Context> options)
            : base(options)
        {
        }

        public DbSet<Review> Review { get; set; } = default!;
    }
}
