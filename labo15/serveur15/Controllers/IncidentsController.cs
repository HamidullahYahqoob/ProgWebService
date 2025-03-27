using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serveur15.Data;
using serveur15.Models;
using serveur15.Models;
using serveur15.Models.DTOs;

namespace serveur15.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class IncidentsController : ControllerBase
    {
        private readonly serveur15Context _context;

        public IncidentsController(serveur15Context context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<ActionResult<Incident>> PostIncident(IncidentDTO inci)
        {
            List<Dinosaur> dinosaurs = new List<Dinosaur>();

            
            foreach (int id in inci.Ids)
            {

                Dinosaur? i = await _context.Dinosaur.FindAsync(id);

                
                if (i == null) return NotFound(new { Message = "Aucun Dinausaur n'existe avec l'id " + id + "." });

                dinosaurs.Add(i);
            }

        

            Incident incid = new Incident { Id = 0, Description = inci.Description, NbCasualties = inci.Nb,Date=DateTime.Now, InvolvedDinosaurs = dinosaurs };
            _context.Incident.Add(incid);
            await _context.SaveChangesAsync();

            return NoContent();
            
        }

    }
}
