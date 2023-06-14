namespace Domain.Entities
{
    public class CurrentStaff
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public Guid CompanyId { get; set; }
        public CompanyUser Company { get; set; }
        public Guid FunctionId { get; set; }
        public Function Function { get; set; }
        public Guid StaffTypeId { get; set; }
        public StaffType StaffType { get; set; }
    }
}