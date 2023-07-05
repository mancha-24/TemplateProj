namespace Application.DTOs
{
    public class ProjectOverviewDto
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
    }
}