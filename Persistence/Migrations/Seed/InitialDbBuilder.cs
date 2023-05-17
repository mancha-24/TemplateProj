using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Migrations.Seed
{
    public class InitialDbBuilder
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly ProgresaDataContext _context;
        public InitialDbBuilder(ProgresaDataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Create()
        {
            await InitialUserManagerCreator.Create(_userManager);
            await InitialUserRolesCreator.Create(_context, _roleManager);
        }
    }
}