using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using labo14_serveur.Controllers.Models;

namespace labo14_serveur.Data
{
    public class labo14_serveurContext : DbContext
    {
        public labo14_serveurContext (DbContextOptions<labo14_serveurContext> options)
            : base(options)
        {
        }

        public DbSet<labo14_serveur.Controllers.Models.Item> Item { get; set; } = default!;
    }
}
