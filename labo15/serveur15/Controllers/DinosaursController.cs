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
using serveur15.Models;
using serveur15.Models.DTOs;
using serveur15.Services;

namespace serveur15.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DinosaursController : ControllerBase
    {
        private DinosaurService _dinoService;
        private ZookeeperService _zookeeperService;



        public DinosaursController(DinosaurService dinoService, ZookeeperService zookeeperService)
        {
            _dinoService = dinoService;
            _zookeeperService = zookeeperService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dinosaur>>> GetDinosaur()
        {
            return await _dinoService.GetAll();
        }

        // PostDinosaur

        [HttpPost]
        public async Task<ActionResult<Dinosaur>> PostDinosaur(DinoDTO dinosaur)
        {
            Zookeeper? zookeeper = await _zookeeperService.Get(dinosaur.ZookeeperID);

            if (zookeeper == null) return NotFound(new { Message = "Ce zookeeper n'existe pas. Il a peut-être été supprimé ?" });

            Dinosaur dino = new Dinosaur {Id= 0, Name=dinosaur.Name, Specie=dinosaur.Specie,Zookeeper= zookeeper };

            Dinosaur? newDinosaur = await _dinoService.Create(dino);
            if (newDinosaur == null) return StatusCode(StatusCodes.Status500InternalServerError);
            return newDinosaur;

           
        }

        // DeleteDinosaur

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDinosaur(int id)
        {

            bool? post = await _dinoService.Delete(id);


            if (post == false) return NotFound();


          

            

            return NoContent();
        }
    }
}

