using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<AppRole>() 
            .AddRoleManager<RoleManager<AppRole>>()
            .AddEntityFrameworkStores<ProgresaDataContext>();

            //services.AddScoped<RoleManager<AppRole>>();

            services.AddAuthentication();

            return services;
        }
    }
}
