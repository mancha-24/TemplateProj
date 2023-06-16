namespace Application.DTOs
{
    public class CompanyDto
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
        public string Sector { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
    }
}