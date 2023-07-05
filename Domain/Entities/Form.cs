namespace Domain.Entities
{
    public class Form
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public int SectorId { get; set; }
        public Sector Sector { get; set; }
    }
}