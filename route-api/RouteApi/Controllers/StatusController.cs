using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteApi.Models;

namespace RouteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly RouteContext _context;

        public StatusController(RouteContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatuses()
        {
            //return await _context.Statuses
            //    .GroupBy(status => status.VehicleId)
            //    .Select(statusGroup => statusGroup.OrderByDescending(status => status.Notified).First())                
            //    .ToListAsync();

            return await _context.Vehicles
                .Include(v => v.Statuses)
                .ThenInclude(s => s.Vehicle)
                .Select(v => v.Statuses.OrderByDescending(s => s.Notified).First())
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var status = await _context.Statuses.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }

        [HttpPost]
        public async Task<ActionResult<Status>> PostStatus(Status status)
        {
            _context.Statuses.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStatus), new { id = status.Id }, status);
        }
    }
}
