using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using serveur15.Models;

namespace serveur15.Data
{
    public class serveur15Context : DbContext
    {
        public serveur15Context (DbContextOptions<serveur15Context> options) : base(options){}

        public DbSet<Dinosaur> Dinosaur { get; set; } = default!;
        public DbSet<Incident> Incident { get; set; } = default!;
        public DbSet<Zookeeper> Zookeeper { get; set; } = default!;
    }
}
