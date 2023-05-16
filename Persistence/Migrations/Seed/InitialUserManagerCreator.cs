using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Migrations.Seed
{
    public static class InitialUserManagerCreator
    {
        public static async Task Create(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "Administrator", UserName = "admin",Email = "admin@progresa.com" } 
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}