using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ProgresaDataContext : IdentityDbContext<AppUser>
    {
        public ProgresaDataContext(DbContextOptions options) : base(options)
        {
        }
    }
}