using serveur15.Data;

namespace serveur15.Services
{
    public class IncidentService
    {
        private readonly serveur15Context _context;

        public IncidentService(serveur15Context context)
        {
            _context = context;
        }
    }
}
