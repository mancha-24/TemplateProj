using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Account
{
    [Table("AppPermissions")]
    public class AppPermission
    {
        public int Id { get; set; }
        public bool IsGranted { get; set; }
        public string Name { get; set; }
        public string IdRole { get; set; }
        public virtual IdentityRole Role { get; set; }
    }
}