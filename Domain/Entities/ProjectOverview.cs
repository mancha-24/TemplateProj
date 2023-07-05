namespace Domain.Entities
{
    public class ProjectOverview
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; }
        public string ProjectLocation { get; set; }
        public string NatureProject { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Client { get; set; }
        public int Personnel { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid CompanyId { get; set; }
        public CompanyUser Company { get; set; }
    }
}