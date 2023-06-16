namespace Domain.Entities
{
    public class Function
    {
        public Guid Id { get; set; }
        public string IscoCode { get; set; }
        public string Name { get; set; }
        public int? FunctionTypeId { get; set; }
        public FunctionType FunctionType { get; set; }
        public int SectorId { get; set; }
        public Sector Sector { get; set; }
        public ICollection<CurrentStaff> CurrentStaff { get; set; }
    }
}