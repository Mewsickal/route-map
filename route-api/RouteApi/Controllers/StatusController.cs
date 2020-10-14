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
            return await _context.Vehicles
                .Include(v => v.Statuses)
                .ThenInclude(s => s.Vehicle)
                .Select(v => v.Statuses.OrderByDescending(s => s.Notified).FirstOrDefault())
                .Where(status => status != null)
                .ToListAsync();
        }

        [HttpGet("vehicles/{id}")]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatusForVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(vehicle => vehicle.Statuses)
                .FirstOrDefaultAsync(vehicle => vehicle.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle.Statuses;
        }

        [HttpGet("{id:int}")]
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
            var vehicle = await _context.Vehicles.FindAsync(status.VehicleId);

            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Statuses.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStatus), new { id = status.Id }, status);
        }
    }
}
