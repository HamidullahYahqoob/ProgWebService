using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serveur21.Data;
using serveur21.DTOs;
using serveur21.Models;

namespace serveur21.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly serveur21Context _context;
        private readonly UserManager<User> _userManager;

        public ReviewsController(serveur21Context context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDisplayDTO>>> GetReview()
        {
            return await _context.Review.Select(r => new ReviewDisplayDTO(r)).ToListAsync();
        }

        [HttpPost]
        [Authorize(Roles = "student")]
        public async Task<ActionResult<ReviewDisplayDTO>> PostReview(ReviewDTO reviewDTO)
        {
            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            if (user == null) return Unauthorized();

            Review review = new Review { Id = 0, Text = reviewDTO.Text, User = user };

            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new ReviewDisplayDTO(review));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            User? user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            bool isAdmin = await _userManager.IsInRoleAsync(user, "corruptedTeacher ");

            if (user == null) return Unauthorized();

            
            Review? review = await _context.Review.FindAsync(id);
            if (review == null) return NotFound();

            if (review.User != user && !isAdmin) return Unauthorized();


            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
