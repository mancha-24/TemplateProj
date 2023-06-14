namespace Domain.Entities
{
    public class StaffData
    {
        public Guid Id { get; set; }
        public string Training { get; set; }
        public decimal SalaryMonth { get; set; }
        public double DaysWeek { get; set; }
        public double HoursWeek { get; set; }
        public Guid CompanyId { get; set; }
        public CompanyUser Company { get; set; }
        public Guid FunctionId { get; set; }
        public Function Function { get; set; }
    }
}