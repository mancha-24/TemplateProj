namespace Domain.Entities
{
    public class SubContractor
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public CompanyUser Company { get; set; }
        public string Name { get; set; }
        public Guid FunctionId { get; set; }
        public Function Function { get; set; }
        // public string Since { get; set; }
        public int EmployeesNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public bool NeedEmployees { get; set; }
    }
}