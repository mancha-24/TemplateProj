using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Migrations.Seed
{
    public class InitialDbBuilder
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ProgresaDataContext _context;
        public InitialDbBuilder(ProgresaDataContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task Create()
        {
            await InitialUserManagerCreator.Create(_userManager);
        }
    }
}