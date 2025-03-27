using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using serveur15.Data;
using serveur15.Models;
using serveur15.Services;

namespace serveur15.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ZookeepersController : ControllerBase
    {

        private ZookeeperService _zookeeperService;

        public ZookeepersController(ZookeeperService zookeeperService)
        {

            _zookeeperService = zookeeperService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zookeeper>>> GetZookeeper()
        {
            return await _zookeeperService.GetAll();
        }

        // PostZookeeper

        [HttpPost]
        public async Task<ActionResult<Zookeeper>> PostZookeeper(Zookeeper zookeeper)
        {
            Zookeeper? newZookeeper = await _zookeeperService.Create(zookeeper);
            if(newZookeeper == null) return StatusCode(StatusCodes.Status500InternalServerError);

            return newZookeeper;
        }
        // DeleteZookeeper

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZookeeper(int id)
        {

            bool deleteSuccess = await _zookeeperService.Delete(id);
            if (!deleteSuccess) return NotFound();

            return Ok(new { Message = "Suppression réussie." });
        }
    }
}
