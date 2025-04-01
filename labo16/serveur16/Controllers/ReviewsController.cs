using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serveur16.Data;
using serveur16.Models;
using serveur16.Models.DTOs;
using static System.Net.Mime.MediaTypeNames;

namespace serveur16.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly serveur16Context _context;
        private readonly UserManager<User> _userManager;

        public ReviewsController(serveur16Context context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ReviewDisplayDTO>>> GetReview()
        {

            IEnumerable<Review> reviews = await _context.Review.ToListAsync();
            return Ok(reviews.Select(c => new ReviewDisplayDTO(c)));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditReview(int id/*, ReviewDTO reviewDTO*/)
        {
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpvoteReview(int id)
        {
            return Ok();
        }

        [HttpPost]

        [Authorize]
        public async Task<ActionResult<Review>> PostReview(ReviewDTO reviewDTO)
        {

            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (user == null) return Unauthorized();


            Review actu = new Review { Id = 0, Text = reviewDTO.Text, Game = reviewDTO.Game, Author = user };


            if (actu == null) return StatusCode(StatusCodes.Status500InternalServerError,
                new { Message = "Veuillez réessayer plus tard." });


            _context.Review.Add(actu);

            await _context.SaveChangesAsync();

            

            return Ok(new ReviewDisplayDTO(actu));
           
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            Review? review = await _context.Review.FindAsync(id);

            if (review == null) return NotFound();

            if (user == null || !user.Reviews.Contains(review)) return Unauthorized(new { Message = "Hey touche pas, c'est pas à toi !" });

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Commentaire supprimé." });
        }
    }
}
