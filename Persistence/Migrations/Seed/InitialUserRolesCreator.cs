using Domain.Authorization;
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
            var adminRole = context.AppRoles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.Admin);
            if (adminRole == null)
            {
                adminRole = context.AppRoles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.Admin }).Entity;
                await context.SaveChangesAsync();
                //await roleManager.CreateAsync(adminRole); 
            }

            var userDPLRole = context.AppRoles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.UserDPL);
            if (userDPLRole == null)
            {
                userDPLRole = context.AppRoles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.UserDPL }).Entity;
                await context.SaveChangesAsync();
            }

            var companyRole = context.AppRoles.FirstOrDefault(r => r.Name == StaticRoleNames.Host.Instance.Company);
            if (companyRole == null)
            {
                companyRole = context.AppRoles.Add(new AppRole { Name = StaticRoleNames.Host.Instance.Company }).Entity;
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

            //Permissions Role Admin
            var adminPagesPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages && p.IdRole == adminRole.Id);
            if (adminPagesPermission == null)
            {
                adminPagesPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminPagesPermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration && p.IdRole == adminRole.Id);
            if (adminAdministrationPermission == null)
            {
                adminAdministrationPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationPermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationRolesPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Roles && p.IdRole == adminRole.Id);
            if (adminAdministrationRolesPermission == null)
            {
                adminAdministrationRolesPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Roles,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationRolesPermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationRolesCreatePermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Roles_Create && p.IdRole == adminRole.Id);
            if (adminAdministrationRolesCreatePermission == null)
            {
                adminAdministrationRolesCreatePermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Roles_Create,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationRolesCreatePermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationRolesEditPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Roles_Edit && p.IdRole == adminRole.Id);
            if (adminAdministrationRolesEditPermission == null)
            {
                adminAdministrationRolesEditPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Roles_Edit,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationRolesEditPermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationRolesDeletePermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Roles_Delete && p.IdRole == adminRole.Id);
            if (adminAdministrationRolesDeletePermission == null)
            {
                adminAdministrationRolesDeletePermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Roles_Delete,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationRolesDeletePermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationUsersPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Users && p.IdRole == adminRole.Id);
            if (adminAdministrationUsersPermission == null)
            {
                adminAdministrationUsersPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Users,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationUsersPermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationUsersCreatePermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Users_Create && p.IdRole == adminRole.Id);
            if (adminAdministrationUsersCreatePermission == null)
            {
                adminAdministrationUsersCreatePermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Users_Create,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationUsersCreatePermission);
                await context.SaveChangesAsync();
            }

            var adminAdministrationUsersEditPermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Users_Edit && p.IdRole == adminRole.Id);
            if (adminAdministrationUsersEditPermission == null)
            {
                adminAdministrationUsersEditPermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Users_Edit,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationUsersEditPermission);
                await context.SaveChangesAsync();
            }
            
            var adminAdministrationUsersDeletePermission = context.Permissions.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration_Users_Delete && p.IdRole == adminRole.Id);
            if (adminAdministrationUsersDeletePermission == null)
            {
                adminAdministrationUsersDeletePermission = new AppPermission
                {
                    IsGranted = true,
                    Name = AppPermissions.Pages_Administration_Users_Delete,
                    IdRole = adminRole.Id
                };

                context.Permissions.Add(adminAdministrationUsersDeletePermission);
                await context.SaveChangesAsync();
            }
        }
    }
}