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
        }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Status> Statuses { get; set; }
    }
}
