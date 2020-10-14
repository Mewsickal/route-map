using Microsoft.AspNetCore.Antiforgery;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RouteApi.Models
{
    public class RouteContext : DbContext
    {
        public RouteContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(b => b.Notified)
                .HasDefaultValueSql("CONVERT(date, GETDATE())");
            });

            AddData(modelBuilder);            
        }

        private void AddData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>().HasData(
                new Vehicle { Id = 1, Name = "Vehicle1" },
                new Vehicle { Id = 2, Name = "Vehicle2" },
                new Vehicle { Id = 3, Name = "Vehicle2" }
                );

            modelBuilder.Entity<Status>().HasData(
                new Status { VehicleId = 1, Id = 1, Latitude = 50, Longitude = 50, Speed = 0, Notified = DateTime.Now.AddDays(-3) },
                new Status { VehicleId = 1, Id = 2, Latitude = 50, Longitude = 50, Speed = 50, Notified = DateTime.Now.AddDays(-1) },
                new Status { VehicleId = 1, Id = 3, Latitude = 51, Longitude = 51, Speed = 50, Notified = DateTime.Now },
                new Status { VehicleId = 2, Id = 4, Latitude = 35, Longitude = 35, Speed = 50, Notified = DateTime.Now }
                );
        }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Status> Statuses { get; set; }
    }
}
