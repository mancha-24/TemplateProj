using Domain.Entities;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ProgresaDataContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public ProgresaDataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<AppPermission> Permissions { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<CompanyUser> CompanyUsers { get; set; }
        public DbSet<Sector> Sectors { get; set; }
        public DbSet<Function> Functions { get; set; }
        public DbSet<CurrentStaff> CurrentStaff { get; set; }
        public DbSet<StaffType> StaffTypes { get; set; }
        public DbSet<StaffData> StaffData { get; set; }
        public DbSet<FunctionType> FunctionTypes { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppPermission>(x => x.HasKey(a => new { a.Id }));

            builder.Entity<AppRole>()
            .HasMany(r => r.Permissions)
            .WithOne(p => (AppRole)p.Role)
            .HasForeignKey(p => p.IdRole);

            builder.Entity<AppUser>()
                .HasOne(u => u.Company)
                .WithOne(c => c.User)
                .HasForeignKey<AppUser>(u => u.IdCompany);

            builder.Entity<CompanyUser>()
                .Property(c => c.CreationDate)
                .HasDefaultValue(DateTime.Now);
            
            builder.Entity<CompanyUser>()
                .HasOne(cu => cu.Sector)
                .WithMany()
                .HasForeignKey(cu => cu.SectorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}