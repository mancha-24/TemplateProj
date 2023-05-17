using Domain.Authorization.Roles;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Migrations.Seed
{
    public static class InitialUserRolesCreator
    {
        public static async Task Create(ProgresaDataContext context)
        {
            //var adminRole = await roleManager.FindByNameAsync(StaticRoleNames.Host.Instance.Admin);
            var adminRole = context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.Admin);
            if (adminRole == null)
            {
                adminRole = context.Roles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.Admin }).Entity;
                await context.SaveChangesAsync();
                //await roleManager.CreateAsync(adminRole); 
            }

            var userDPLRole = context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.UserDPL);
            if (userDPLRole == null)
            {
                userDPLRole = context.Roles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.UserDPL }).Entity;
                await context.SaveChangesAsync();
            }

            var companyRole = context.Roles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.Company);
            if (companyRole == null)
            {
                companyRole = context.Roles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.Company }).Entity;
                await context.SaveChangesAsync();
            }

            //User Roles admin
            var admin = context.Users.FirstOrDefault(u => u.UserName == "admin");
            if (admin != null)
            {
                var hasAdminRole = context.UserRoles.Any(r => r.RoleId == adminRole.Id);
                if (!hasAdminRole)
                {
                    context.UserRoles.Add(new IdentityUserRole<string> { RoleId = adminRole.Id, UserId = admin.Id});
                    await context.SaveChangesAsync();
                }

                var hasUserDPLRole = context.UserRoles.Any(r => r.RoleId == userDPLRole.Id);
                if (!hasUserDPLRole)
                {
                    context.UserRoles.Add(new IdentityUserRole<string> { RoleId = userDPLRole.Id, UserId = admin.Id});
                    await context.SaveChangesAsync();
                }

                var hasCompanyRole = context.UserRoles.Any(r => r.RoleId == companyRole.Id);
                if (!hasCompanyRole)
                {
                    context.UserRoles.Add(new IdentityUserRole<string> { RoleId = companyRole.Id, UserId = admin.Id});
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}