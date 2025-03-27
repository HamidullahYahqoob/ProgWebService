using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using serveur15.Data;
using serveur15.Models;
using serveur15.Models.DTOs;

namespace serveur15.Services
{
    public class DinosaurService
    {
        private readonly serveur15Context _context;

        public DinosaurService(serveur15Context context)
        {
            _context = context;
        }

        private bool IsConstextValid()
        {
            return _context != null && _context.Dinosaur != null;
        }

        public async Task<List<Dinosaur>?> GetAll()
        {
            if (!IsConstextValid()) return null;

            return await _context.Dinosaur.ToListAsync();
        }

        public async Task<Dinosaur?> Create(Dinosaur dino)
        {
            if (!IsConstextValid()) return null;

            _context.Dinosaur.Add(dino);
            await _context.SaveChangesAsync();


            return dino;
        }

        public async Task<bool> Delete(int id)
        {
            if (!IsConstextValid()) return false;
            Dinosaur? videoGame = await _context.Dinosaur.FindAsync(id);

            if (videoGame == null) return false;

            foreach (Incident I in videoGame.Incidents)
            {
                if (I.InvolvedDinosaurs.Count == 1)
                {
                    _context.Incident.Remove(I);
                }

            }

            _context.Dinosaur.Remove(videoGame);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
