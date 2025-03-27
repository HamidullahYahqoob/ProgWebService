using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using serveur15.Data;
using serveur15.Models;

namespace serveur15.Services
{
    public class ZookeeperService
    {
        private readonly serveur15Context _context;

        public ZookeeperService(serveur15Context context)
        {
            _context = context;
        }

        private bool IsContextValid() => _context != null && _context.Zookeeper != null;




        public async Task<Zookeeper?> Create(Zookeeper zookeeper)
        {
            if (!IsContextValid()) return null;

            _context.Zookeeper.Add(zookeeper);
            await _context.SaveChangesAsync();

            return zookeeper;
        }

        public async Task<List<Zookeeper>?> GetAll()
        {
            if (!IsContextValid()) return null;

            return await _context.Zookeeper.ToListAsync();
        }


        public async Task<bool> Delete(int id)
        {
            if (!IsContextValid()) return false;
            Zookeeper? videoGame = await _context.Zookeeper.FindAsync(id);

            if (videoGame == null) return false;

            foreach (Dinosaur d in videoGame.Dinosaurs)
            {

                foreach (Incident I in d.Incidents)
                {
                    if (I.InvolvedDinosaurs.Count == 1)
                    {
                        _context.Incident.Remove(I);
                    }

                }
                _context.Dinosaur.Remove(d);
            }

            _context.Zookeeper.Remove(videoGame);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<Zookeeper?> Get(int id)
        {
            if (!IsContextValid()) return null;

            return await _context.Zookeeper.FindAsync(id);
        }
    }
}
