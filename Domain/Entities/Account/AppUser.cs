using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Account
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }      
    }
}