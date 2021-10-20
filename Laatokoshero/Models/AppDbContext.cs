using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Laatokoshero.Models.Admin;

namespace Laatokoshero.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {
        }
        public DbSet<AdminProfile> adminProfiles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdminProfile>().Property(p => p.ProfileLogo)
            .HasColumnType("Blob");
        }
    }
}
