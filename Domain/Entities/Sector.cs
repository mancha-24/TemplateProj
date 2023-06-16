namespace Domain.Entities
{
    public class Sector
    {
        public int Id { get; set; }
        public string SectorName { get; set; }
        public ICollection<Function> Functions { get; set; }
        public ICollection<CompanyUser> Companies { get; set; }
    }
}