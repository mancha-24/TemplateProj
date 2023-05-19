using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Account
{
    public class AppRole : IdentityRole
    {
        public virtual List<AppPermission> Permissions { get; set; }
    }
}