using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RouteApi.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Status> Statuses { get; set; }
    }
}
