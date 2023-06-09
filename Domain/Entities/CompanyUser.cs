using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Domain.Entities.Account;

namespace Domain.Entities
{
    public class CompanyUser
    {
        public Guid Id { get; set; }
        public string Trade { get; set; }
        public string RegName { get; set; }
        public string KvkNumber { get; set; }
        public string Director { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string EmailCompany { get; set; }
        public string SvbNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public string Sector { get; set; }
        [NotMapped]
        public string Email { get; set; }
        [NotMapped]
        public string Password { get; set; }

        [JsonIgnore]
        public AppUser User { get; set; }
    }
}