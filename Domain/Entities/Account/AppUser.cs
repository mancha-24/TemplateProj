using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Account
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Guid? IdCompany { get; set; }
        public CompanyUser Company { get; set; }
    }
}