using System;
using System.ComponentModel.DataAnnotations;

namespace RouteApi.Models
{
    public class Status
    {
        public int Id { get; set; }

        [Required]
        public float? Latitude { get; set; }

        [Required]
        public float? Longitude { get; set; }

        public int Speed { get; set; }

        public DateTime Notified { get; set; }

        [Required]
        public int VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }
    }
}
